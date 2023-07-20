import * as z from 'zod'
export const dogsDraftSchema = z.object({
  name: z.string(),
  img: z.string(),
  breed: z.string(),
  age: z.number(),
  gender: z.string(),
  personality: z.string(),
  description: z.string(),
})

export const addDogsDraftSchema = dogsDraftSchema.extend({
  userId: z.string(),
})

export const dogsDataBackendSchema = addDogsDraftSchema.extend({
  id: z.number(),
})

export type DogsData = z.infer<typeof dogsDraftSchema>
export type AddDogData = z.infer<typeof addDogsDraftSchema>
export type DogsDataBackend = z.infer<typeof dogsDataBackendSchema>
