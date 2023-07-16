import { AddMessageToBackend, MessageFromBackend } from '../../models/messages'
import db from './connection'

export async function getAllMessages(auth0Id: string) {
  return (await db('messages')
    .where('receiver_id', auth0Id)
    .select(
      'id',
      'sender_id',
      'receiver_id',
      'text',
      'sent_at',
      'is_read',
    )) as MessageFromBackend[]
}

export async function getMessageById(messageId: number, auth0Id: string) {
  return (await db('messages')
    .where('id', messageId)
    .where('receiver_id', auth0Id)
    .first(
      'id',
      'sender_id',
      'receiver_id',
      'text',
      'sent_at',
      'is_read',
    )) as MessageFromBackend[]
}

export async function addNewMessage(newMessage: AddMessageToBackend) {
  return await db('messages').insert({
    receiver_id: newMessage.receiver_id,
    text: newMessage.text,
    sender_id: newMessage.sender_id,
    is_read: newMessage.is_read,
    sent_at: newMessage.sent_at,
  })
}
