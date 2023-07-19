import request from 'superagent'
import { AddMessageToBackend, MessageFromBackend } from '../../models/messages'

const rootUrl = '/api/v1/'

export async function fetchMessagesList(
  token: string,
): Promise<MessageFromBackend[]> {
  const res = await request
    .get(rootUrl + 'messages')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as MessageFromBackend[]
}

export async function fetchMessageById(
  token: string,
  messageId: number,
): Promise<MessageFromBackend> {
  const res = await request
    .get(rootUrl + `messages/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function addMessage(
  newMessage: AddMessageToBackend,
  token: string,
): Promise<void> {
  await request
    .post(rootUrl + 'messages')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(newMessage)
}
