import request from 'superagent'
import { DogsData, DogsDataBackend } from '../../models/dog'

const rootUrl = '/api/v1/'

export async function fetchDogsList(token: string): Promise<DogsDataBackend[]> {
  const res = await request
    .get(rootUrl + 'dogs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body.dogs
}

export async function addDog(newDog: DogsData, token: string): Promise<void> {
  await request
    .post(rootUrl + 'dogs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(newDog)
}
