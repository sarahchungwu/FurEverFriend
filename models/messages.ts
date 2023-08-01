import * as z from 'zod'

export const updateMessageStatusSchema = z.object({
  isRead: z.boolean(),
})

export const addMessageDraftSchema = z.object({
  receiverId: z.string(),
  text: z.string(),
})

export const addMessageToBackendSchema = addMessageDraftSchema.extend({
  senderId: z.string(),
  isRead: z.boolean(),
  sentAt: z.string(),
})

export const messageFromBackendSchema = addMessageToBackendSchema.extend({
  senderName: z.string(),
  isRead: z.boolean(),
  id: z.number(),
})

export type UpdateMessageStatus = z.infer<typeof updateMessageStatusSchema>
export type AddMessage = z.infer<typeof addMessageDraftSchema>
export type AddMessageToBackend = z.infer<typeof addMessageToBackendSchema>
export type MessageFromBackend = z.infer<typeof messageFromBackendSchema>
