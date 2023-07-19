import * as z from 'zod'

export const addMessageDraftSchema = z.object({
  receiver_id: z.string(),
  text: z.string(),
})

export const addMessageToBackendSchema = addMessageDraftSchema.extend({
  sender_id: z.string(),
  is_read: z.boolean(),
  sent_at: z.date(),
})

export const messageFromBackendSchema = addMessageToBackendSchema.extend({
  sender_name: z.string(),
  is_read: z.boolean(),
  sent_at: z.date(),
  id: z.number(),
})

export type AddMessage = z.infer<typeof addMessageDraftSchema>
export type AddMessageToBackend = z.infer<typeof addMessageToBackendSchema>
export type MessageFromBackend = z.infer<typeof messageFromBackendSchema>
