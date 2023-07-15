import { UsersDataBackend } from '../../models/user'
import db from './connection'

// use .first() instead of use .select().first()
export async function getUserById(auth0Id: string) {
  return (await db('users')
    .where('auth0_id', auth0Id)
    .first(
      'auth0_id',
      'username',
      'email',
      'pronouns',
      'bio',
    )) as UsersDataBackend[]
}

export async function upsertProfile(profile: UsersDataBackend) {
  await db('users')
    .insert({
      auth0_id: profile.auth0Id,
      name: profile.name,
      email: profile.email,
      pronouns: profile.pronouns,
      bio: profile.bio,
    })
    .onConflict('auth0_id')
    .merge()
}
