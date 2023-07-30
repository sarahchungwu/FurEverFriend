import { vi, describe, it, expect, afterEach } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/dogs'
import { getMockToken } from './mockToken'
import { AddDogData, DogsData, DogsDataBackend } from '../../models/dog'

vi.mock('../db/dogs.ts')
vi.mock('../logger.ts')

//Dogs' Test
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

describe('GET /api/v1/dogs/all', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with all the dogs', async () => {
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

    vi.mocked(db.getAllDogs).mockResolvedValue(fakeDog)
    const response = await request(server)
      .get('/api/v1/dogs/all')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body.dogs).toEqual(fakeDog)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getAllDogs).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/dogs/all')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})

describe('GET /api/v1/dogs/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with all the dogs', async () => {
    const fakeDog: AddDogData = {
      userId: 'auth123',
      name: 'apple',
      img: '123.jpg',
      breed: 'apple',
      gender: 'femaile',
      age: 1,
      personality: 'friendly',
      description: 'apple loves banana',
    }

    vi.mocked(db.getDogById).mockResolvedValue(fakeDog)
    const response = await request(server)
      .get('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeDog)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getDogById).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})

describe(' /api/v1/dogs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 when creating a new dog', async () => {
    const fakeDog: AddDogData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
      userId: '123',
    }

    vi.mocked(db.addNewDog).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/dogs')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeProfile = {}

    vi.mocked(db.addNewDog).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/dogs')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeProfile)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeDog: AddDogData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
      userId: '123',
    }

    vi.mocked(db.addNewDog).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/dogs')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to insert new dog to database',
    })
  })
})

describe('PATCH /api/v1/dogs/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 when updating dog profile', async () => {
    const fakeDog: DogsData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
    }

    vi.mocked(db.updateDogProfile).mockResolvedValue()
    const response = await request(server)
      .patch('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeDog = {}

    vi.mocked(db.updateDogProfile).mockResolvedValue()
    const response = await request(server)
      .patch('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const fakeDog: DogsData = {
      name: 'apple',
      img: '123.jpg',
      breed: 'fruits',
      age: 1,
      gender: 'female',
      personality: 'happy as',
      description: 'red apple',
    }

    vi.mocked(db.updateDogProfile).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .patch('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to update dog in database',
    })
  })
})

describe('DELETE /api/v1/dogs/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 when creating a new profile', async () => {
    vi.mocked(db.deleteDog).mockResolvedValue()
    const response = await request(server)
      .delete('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.deleteDog).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .delete('/api/v1/dogs/:id')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to delete the data',
    })
  })
})
