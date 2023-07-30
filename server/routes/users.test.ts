import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/users'
import { getMockToken } from './mockToken'
import { UsersDataBackend } from '../../models/user'

vi.mock('../db/users.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/users', () => {
  it('should return 200 with a user', async () => {
    const fakeUser: UsersDataBackend = {
      auth0Id: '123',
      username: 'apple',
      email: 'banana123@example.com',
      pronouns: 'she/her',
      bio: 'She is a apple',
    }

    vi.mocked(db.getUserById).mockResolvedValue(fakeUser)
    const response = await request(server)
      .get('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.user).toEqual(fakeUser)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getUserById).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get user from the database',
    })
  })
})
