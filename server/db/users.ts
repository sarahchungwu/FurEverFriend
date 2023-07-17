import { UpdateUsersData, UsersDataBackend } from '../../models/user'
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
    )) as UsersDataBackend
}

//  add user
export async function upsertProfile(profile: UsersDataBackend) {
  await db('users')
    .insert({
      auth0_id: profile.auth0Id,
      username: profile.username,
      email: profile.email,
      pronouns: profile.pronouns,
      bio: profile.bio,
    })
    .onConflict('auth0_id')
    .merge()
}

//update the user
export async function updateProfile(profile: UpdateUsersData, auth0Id: string) {
  await db('users').where('auth0_id', auth0Id).update({
    username: profile.username,
    pronouns: profile.pronouns,
    bio: profile.bio,
  })
}
