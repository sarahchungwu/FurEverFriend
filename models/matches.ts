import * as z from 'zod'

export const matchListSchema = z.object({
  dog_name: z.string(),
  matched_dog_id: z.number(),
  dog_img: z.string(),
  dog_gender: z.number(),
  matched_username: z.string(),
  matched_user_id: z.string(),
  dog_personality: z.string(),
  dog_description: z.string(),
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
