import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/dogs'
import { getMockToken } from './mockToken'
import { AddMatch, AddMatchToBackend, MatchList } from '../../models/matches'
import { AddDogData } from '../../models/dog'

vi.mock('../db/dogs.ts')
vi.mock('../logger.ts')

describe('GET /api/v1/dogs/:id/matches', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with matchlist for the dog', async () => {
    const dogId = '111'
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
      .get(`/api/v1/dogs/${dogId}/matches`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeMatchList)
  })
  it('should return 500 when no access token is passed', async () => {
    const dogId = '111'
    vi.mocked(db.getMatchList).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get(`/api/v1/dogs/${dogId}/matches`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})

describe('POST /api/v1/dogs/:id/matches', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 when creating a new match for the dog', async () => {
    const fakeMatch: AddMatch = {
      matchedDogId: 3,
      dogId: 1,
    }

    const dogId = '111'
    const fakeMatchedDogData: AddDogData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
      userId: '123',
    }
    vi.mocked(db.getMatchedDogById).mockResolvedValue(fakeMatchedDogData)

    const newMatch = {
      ...fakeMatch,
      userId: '123',
    } as AddMatchToBackend

    vi.mocked(db.addNewMatch).mockResolvedValue([1])
    const response = await request(server)
      .post(`/api/v1/dogs/${dogId}/matches`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(newMatch)
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeNewMatch = {}
    const dogId = '111'
    const fakeMatchedDogData: AddDogData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
      userId: '123',
    }
    vi.mocked(db.getMatchedDogById).mockResolvedValue(fakeMatchedDogData)

    const newMatch = {
      ...fakeNewMatch,
      userId: '123',
    } as AddMatchToBackend
    vi.mocked(db.addNewMatch).mockResolvedValue([1])
    const response = await request(server)
      .post(`/api/v1/dogs/${dogId}/matches`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(newMatch)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const dogId = '111'
    const fakeMatch: AddMatch = {
      matchedDogId: 3,
      dogId: 1,
    }

    const fakeMatchedDogData: AddDogData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
      userId: '123',
    }
    vi.mocked(db.getMatchedDogById).mockResolvedValue(fakeMatchedDogData)

    const newMatch = {
      ...fakeMatch,
      userId: '123',
    } as AddMatchToBackend

    vi.mocked(db.addNewMatch).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post(`/api/v1/dogs/${dogId}/matches`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(newMatch)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to insert new match dog to database',
    })
  })
})
