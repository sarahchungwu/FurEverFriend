import * as z from 'zod'
export const dogsDraftSchema = z.object({
  name: z.string(),
  img: z.string(),
  breed: z.string(),
  age: z.number(),
  personality: z.string(),
  description: z.string(),
})

export const dogsDataBackendSchema = dogsDraftSchema.extend({
  id: z.number(),
  user_id: z.string(),
})

export type DogsData = z.infer<typeof dogsDraftSchema>
export type DogsDataBackend = z.infer<typeof dogsDataBackendSchema>
