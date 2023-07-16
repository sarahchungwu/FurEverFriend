import * as z from 'zod'

export const matchListSchema = z.object({
  dog_name: z.string(),
  dog_id: z.number(),
  dog_img: z.string(),
})

export const addMatchSchema = z.object({
  dogId: z.number(),
  matchedDogId: z.number(),
})
export const addMatchToBackendSchema = addMatchSchema.extend({
  userId: z.string(),
})

export type MatchList = z.infer<typeof matchListSchema>
export type AddMatch = z.infer<typeof addMatchSchema>
export type AddMatchToBackend = z.infer<typeof addMatchToBackendSchema>
