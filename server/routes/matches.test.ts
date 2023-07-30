import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/dogs'
import { getMockToken } from './mockToken'
import { MatchList } from '../../models/matches'

vi.mock('../db/dogs.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/dogs/:id/matches', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with matchlist for the dog', async () => {
    const fakeMatchList: MatchList[] = [
      {
        dogName: 'Apple',
        matchedDogId: 3,
        dogImg: '1111.jpg',
        dogAge: 1,
        dogBreed: 'pug',
        dogGender: 'male',
        dogPersonality: 'playful',
        dogDescription: 'Apple is read',
        matchedUsername: 'Banana',
        matchedUserId: '123',
      },
    ]

    vi.mocked(db.getMatchList).mockResolvedValue(fakeMatchList)
    const response = await request(server)
      .get('/api/v1/dogs/:id/matches')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeMatchList)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getMatchList).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/dogs/:id/matches')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})
