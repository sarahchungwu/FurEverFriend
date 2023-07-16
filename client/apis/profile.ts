import request from 'superagent'
import { UsersDataBackend } from '../../models/user'

const rootUrl = '/api/v1/'

export async function fetchProfiles(token: string): Promise<UsersDataBackend> {
  const res = await request
    .get(rootUrl + 'users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body.user
}
