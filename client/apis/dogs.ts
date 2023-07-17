import request from 'superagent'
import { DogsDataBackend } from '../../models/dog'

const rootUrl = '/api/v1/'

export async function fetchDogsList(token: string): Promise<DogsDataBackend[]> {
  const res = await request
    .get(rootUrl + 'dogs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body.dogs
}
