import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/dogs'
import { getMockToken } from './mockToken'
import { DogsDataBackend } from '../../models/dog'

vi.mock('../db/dogs.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/dogs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with a user', async () => {
    const fakeDog: DogsDataBackend[] = [
      {
        id: 1,
        userId: 'auth123',
        name: 'apple',
        img: '123.jpg',
        breed: 'apple',
        gender: 'femaile',
        age: 1,
        personality: 'friendly',
        description: 'apple loves banana',
      },
    ]

    vi.mocked(db.getDogByUser).mockResolvedValue(fakeDog)
    const response = await request(server)
      .get('/api/v1/dogs')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.dogs).toEqual(fakeDog)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getDogByUser).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/dogs')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})
