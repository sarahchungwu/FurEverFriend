import { AddDogData, DogsData, DogsDataBackend } from '../../models/dog'
import db from './connection'

export async function getDogByUser(auth0Id: string) {
  return (await db('dogs')
    .where('user_id', auth0Id)
    .select(
      'id',
      'name',
      'img',
      'breed',
      'age',
      'personality',
      'description',
    )) as DogsDataBackend[]
}

export async function getDogById(dogId: number, auth0Id: string) {
  return (await db('dogs')
    .where('id', dogId)
    .where('user_id', auth0Id)
    .first(
      'name',
      'img',
      'breed',
      'age',
      'personality',
      'description',
    )) as DogsData[]
}

export async function addNewDog(dogProfile: AddDogData) {
  return await db('dogs').insert({
    user_id: dogProfile.userId,
    name: dogProfile.name,
    img: dogProfile.img,
    breed: dogProfile.breed,
    age: dogProfile.age,
    personality: dogProfile.personality,
    description: dogProfile.description,
  })
}

//update the dog
export async function updateDogProfile(updateDog: DogsData, dogId: number) {
  await db('dogs').where('id', dogId).update({
    name: updateDog.name,
    img: updateDog.img,
    breed: updateDog.breed,
    age: updateDog.age,
    personality: updateDog.personality,
    description: updateDog.description,
  })
}
