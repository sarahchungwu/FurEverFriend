import { AddDogData, DogsData, DogsDataBackend } from '../../models/dog'
import { AddMatchToBackend, MatchList } from '../../models/matches'
import db from './connection'

export async function getDogByUser(auth0Id: string) {
  return (await db('dogs')
    .where('user_id', auth0Id)
    .select(
      'id',
      'user_id',
      'name',
      'img',
      'breed',
      'gender',
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
      'gender',
      'age',
      'personality',
      'description',
    )) as DogsData
}

export async function addNewDog(dogProfile: AddDogData) {
  return await db('dogs').insert({
    user_id: dogProfile.userId,
    name: dogProfile.name,
    img: dogProfile.img,
    breed: dogProfile.breed,
    gender: dogProfile.gender,
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
export async function getMatchList(dogId: number) {
  return (await db('matches')
    .join('dogs', 'dogs.id', 'matched_dog_id')
    .join('users', 'users.auth0_id', 'matches.user_id')
    .where('dog_id', dogId)
    .select(
      'dogs.name as dogName',
      'dogs.id as matchedDogId',
      'dogs.img as dogImg',
      'dogs.age as dogAge',
      'dogs.breed as dogBreed',
      'dogs.gender as dogGender',
      'dogs.personality as dogPersonality',
      'dogs.description as dogDescription',
      'users.username as matchedUsername',
      'users.auth0_id as matchedUserId',
    )) as MatchList[]
}

//add Match to the table

export async function addNewMatch(newMatch: AddMatchToBackend) {
  return await db('matches').insert({
    dog_id: newMatch.dogId,
    user_id: newMatch.userId,
    matched_dog_id: newMatch.matchedDogId,
  })
}

//delete Match?
