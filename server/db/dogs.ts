import { AddDogData, DogsData, DogsDataBackend } from '../../models/dog'
import { MatchList } from '../../models/matches'
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

//delete the dogProfile
export async function deleteDog(dogId: number, auth0Id: string) {
  await db('dogs').where('id', dogId).where('user_id', auth0Id).delete()
}

//get the matchlist for the dog
// in the matchList, i only want to show the image and name
export async function getMatchList(auth0Id: string, dogId: number) {
  return (await db('matches')
    .join('dogs', 'dogs.id', 'matched_dog_id')
    .where('matches.user_id', auth0Id)
    .where('dog_id', dogId)
    .select(
      'dogs.name as dog_name',
      'dogs.id as matched_dog_id',
      'dogs.img as dog_img',
    )) as MatchList[]
}
