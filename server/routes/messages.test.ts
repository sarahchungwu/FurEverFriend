import * as db from '../db/messages'
import request from 'supertest'
import server from '../server'
import { vi, describe, it, expect, afterEach } from 'vitest'
import { MessageFromBackend } from '../../models/messages'
import { getMockToken } from './mockToken'

vi.mock('../db/messages.ts')
vi.mock('../logger.ts')

//GET ALL MESSAGES
describe('GET /api/v1/dogs', () => {
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
