import * as z from 'zod'

export const matchLisSchema = z.object({
  dog_name: z.string(),
  dog_id: z.number(),
  dog_img: z.string(),
})

export type MatchList = z.infer<typeof matchLisSchema>
