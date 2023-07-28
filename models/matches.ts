import * as z from 'zod'

export const matchListSchema = z.object({
  dogName: z.string(),
  matchedDogId: z.number(),
  dogImg: z.string(),
  dogAge: z.number(),
  dogGender: z.number(),
  dogBreed: z.string(),
  matchedUsername: z.string(),
  matchedUserId: z.string(),
  dogPersonality: z.string(),
  dogDescription: z.string(),
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
