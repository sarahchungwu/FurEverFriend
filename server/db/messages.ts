import db from './connection'
export async function getAllMessages(auth0Id: string) {
  return await db('messages')
    .where('receiver_id', auth0Id)
    .select('id', 'sender_id', 'receiver_id', 'text', 'sent_at', 'is_read')
}
