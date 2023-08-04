import { AddMessageToBackend, MessageFromBackend } from '../../models/messages'
import db from './connection'

export async function getAllMessages(auth0Id: string) {
  return (await db('messages')
    .join('users', 'users.auth0_id', 'messages.sender_id')
    .where('receiver_id', auth0Id)
    .select(
      'id',
      'sender_id as senderId',
      'users.username as senderName',
      'receiver_id as receiverId',
      'text',
      'sent_at as sentAt',
      'is_read as isRead',
    )) as MessageFromBackend[]
}

export async function getMessageById(messageId: number, auth0Id: string) {
  return (await db('messages')
    .join('users', 'users.auth0_id', 'messages.sender_id')
    .where('id', messageId)
    .where('receiver_id', auth0Id)
    .first(
      'id',
      'users.username as senderName',
      'receiver_id as receiverId',
      'sender_id as senderId',
      'text',
      'sent_at as sentAt',
      'is_read as isRead',
    )) as MessageFromBackend
}

export async function addNewMessage(newMessage: AddMessageToBackend) {
  return await db('messages').insert({
    receiver_id: newMessage.receiverId,
    text: newMessage.text,
    sender_id: newMessage.senderId,
    is_read: newMessage.isRead,
    sent_at: newMessage.sentAt,
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
export async function deleteMessage(messageId: number, auth0Id: string) {
  await db('messages')
    .where('id', messageId)
    .where('receiver_id', auth0Id)
    .delete()
}
