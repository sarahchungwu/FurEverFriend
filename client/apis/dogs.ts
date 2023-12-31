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

export async function fetchAllDogs(token: string): Promise<DogsDataBackend[]> {
  const res = await request
    .get(rootUrl + 'dogs/all')
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

export async function fetchDogById(
  token: string,
  dogId: number,
): Promise<DogsDataBackend> {
  const res = await request
    .get(rootUrl + `dogs/${dogId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function updateDog(
  updatedDog: DogsData,
  token: string,
  dogId: number,
): Promise<void> {
  await request
    .patch(rootUrl + `dogs/${dogId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(updatedDog)
}

export async function deleteDog(token: string, dogId: number): Promise<void> {
  await request
    .delete(rootUrl + `dogs/${dogId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
}
