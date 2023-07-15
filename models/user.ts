import * as z from 'zod'

export const userDraftSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  pronouns: z.string(),
  bio: z.string(),
})

export const userEditSchema = z.object({
  username: z.string(),
  pronouns: z.string(),
  bio: z.string(),
})

export const usersDataBackendSchema = userDraftSchema.extend({
  auth0Id: z.string(),
})

export type UpdateUsersData = z.infer<typeof userEditSchema>
export type UserData = z.infer<typeof userDraftSchema>
export type UsersDataBackend = z.infer<typeof usersDataBackendSchema>
