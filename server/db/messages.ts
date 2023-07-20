import { AddMessageToBackend, MessageFromBackend } from '../../models/messages'
import db from './connection'

export async function getAllMessages(auth0Id: string) {
  return (await db('messages')
    .join('users', 'users.auth0_id', 'messages.sender_id')
    .where('receiver_id', auth0Id)
    .select(
      'id',
      'sender_id',
      'users.username as sender_name',
      'receiver_id',
      'text',
      'sent_at',
      'is_read',
    )) as MessageFromBackend[]
}

export async function getMessageById(messageId: number, auth0Id: string) {
  return (await db('messages')
    .join('users', 'users.auth0_id', 'messages.sender_id')
    .where('id', messageId)
    .where('receiver_id', auth0Id)
    .first(
      'id',
      'users.username as sender_name',
      'receiver_id',
      'sender_id',
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

export async function updateNewMessage(
  id: number,
  auth0Id: string,
  isRead: boolean,
) {
  return await db('messages')
    .where('id', id)
    .where('receiver_id', auth0Id)
    .update('is_read', isRead)
}

//delete the message
export async function deleteDog(messageId: number, auth0Id: string) {
  await db('messages')
    .where('id', messageId)
    .where('receiver_id', auth0Id)
    .delete()
}
