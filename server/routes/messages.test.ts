import * as db from '../db/messages'
import request from 'supertest'
import server from '../server'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { AddMessageToBackend, MessageFromBackend } from '../../models/messages'
import { getMockToken } from './mockToken'

vi.mock('../db/messages.ts')
vi.mock('../logger.ts')

//GET ALL MESSAGES
describe('GET /api/v1/messages', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with an array of messages', async () => {
    const fakeMessages: MessageFromBackend[] = [
      {
        id: 22,
        senderId: 'auth0|227',
        senderName: 'Banana',
        receiverId: 'auth0|123',
        text: 'Yes, I am available.',
        sentAt: new Date().toISOString(),
        isRead: false,
      },
    ]

    vi.mocked(db.getAllMessages).mockResolvedValue(fakeMessages)
    const response = await request(server)
      .get('/api/v1/messages')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeMessages)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getAllMessages).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/messages')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the data from database',
    })
  })
})

//GET messages by id  api/v1/messages/:id
describe('GET /api/v1/messages/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 200 with all the dogs', async () => {
    const fakeMessage: MessageFromBackend = {
      id: 22,
      senderId: 'auth0|227',
      senderName: 'Banana',
      receiverId: 'auth0|123',
      text: 'Yes, I am available.',
      sentAt: new Date().toISOString(),
      isRead: false,
    }

    vi.mocked(db.getMessageById).mockResolvedValue(fakeMessage)
    const response = await request(server)
      .get(`/api/v1/messages/${fakeMessage.id}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeMessage)
  })
  it('should return 500 when no access token is passed', async () => {
    const fakeMassageId = 22
    vi.mocked(db.getMessageById).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get(`/api/v1/messages/${fakeMassageId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to get the message from the database',
    })
  })
})

//POST messages api/v1/messages

describe('POST /api/v1/messages', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 when creating a message', async () => {
    const newFakeMassage: AddMessageToBackend = {
      receiverId: 'auth0|227',
      text: 'Nice to meet you',
      senderId: 'auth0|123',
      isRead: false,
      sentAt: new Date().toISOString(),
    }

    vi.mocked(db.addNewMessage).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(newFakeMassage)
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeProfile = {}

    vi.mocked(db.addNewMessage).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeProfile)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const newFakeMassage: AddMessageToBackend = {
      receiverId: 'auth0|227',
      text: 'Nice to meet you',
      senderId: 'auth0|123',
      isRead: false,
      sentAt: new Date().toISOString(),
    }

    vi.mocked(db.addNewMessage).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/messages')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(newFakeMassage)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to insert new message to database',
    })
  })
})

//update Massage as is_read to be true
describe('PATCH /api/v1/messages/:id', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return 201 after updating the massage status', async () => {
    const messageId = '22'
    const isRead = true

    vi.mocked(db.updateNewMessage).mockResolvedValue(1)
    const response = await request(server)
      .patch(`/api/v1/messages/${messageId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send({ isRead })
    expect(response.status).toBe(201)
  })

  it('should return 400 if the body does not match the zod schemea', async () => {
    const fakeDog = {}
    const messageId = '22'
    vi.mocked(db.updateNewMessage).mockResolvedValue(1)
    const response = await request(server)
      .patch(`/api/v1/messages/${messageId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send(fakeDog)
    expect(response.status).toBe(400)
  })

  it('should return 500 when no access token is passed', async () => {
    const messageId = '22'
    const isRead = true

    vi.mocked(db.updateNewMessage).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .patch(`/api/v1/messages/${messageId}`)
      .set('authorization', `Bearer ${getMockToken()}`)
      .send({ isRead })
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to update message in database',
    })
  })
})
