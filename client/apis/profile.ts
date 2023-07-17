import request from 'superagent'
import { UpdateUsersData, UserData, UsersDataBackend } from '../../models/user'

const rootUrl = '/api/v1/'

export async function fetchProfiles(token: string): Promise<UsersDataBackend> {
  const res = await request
    .get(rootUrl + 'users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body.user
}

export async function addProfile(
  newUser: UserData,
  token: string,
): Promise<void> {
  await request
    .post(rootUrl + 'users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(newUser)
}

export async function updateProfile(
  updateUser: UpdateUsersData,
  token: string,
): Promise<void> {
  await request
    .patch(rootUrl + 'users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(updateUser)
}
