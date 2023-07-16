import * as z from 'zod'

export const addMessageDraftSchema = z.object({
  receiver_id: z.string(),
  text: z.string(),
  sent_at: z.date(),
})

export const addMessageToBackendSchema = addMessageDraftSchema.extend({
  userIsender_id: z.string(),
  is_read: z.boolean(),
})

export const messageFromBackendSchema = addMessageToBackendSchema.extend({
  id: z.number(),
})

export type AddMessage = z.infer<typeof addMessageDraftSchema>
export type AddMessageToBackend = z.infer<typeof addMessageToBackendSchema>
export type MessageFromBackend = z.infer<typeof messageFromBackendSchema>
