import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/users'
import { getMockToken } from './mockToken'
import { UserData, UsersDataBackend } from '../../models/user'

vi.mock('../db/users.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/users', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
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

describe('POST /api/v1/users', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 when creating a new profile', async () => {
    const fakeProfile: UserData = {
      username: 'apple',
      email: 'banana123@example.com',
      pronouns: 'she/her',
      bio: 'She is a apple',
    }

    vi.mocked(db.upsertProfile).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeProfile)
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeProfile = {}

    vi.mocked(db.upsertProfile).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeProfile)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeProfile: UserData = {
      username: 'apple',
      email: 'banana123@example.com',
      pronouns: 'she/her',
      bio: 'She is a apple',
    }

    vi.mocked(db.upsertProfile).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeProfile)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to insert new user to database',
    })
  })
})
