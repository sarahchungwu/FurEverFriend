import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogById, fetchDogsList } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'

// Fetch all dogs
function AddMatchPage() {
  const userDogId = Number(useParams().id)
  const { user, getAccessTokenSilently } = useAuth0()
  const dogsQuery = useQuery({
    queryKey: 'fetchAllDogs',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchAllDogs(accessToken)

        return response
      }
    },
    enabled: !!user,
  })
  //query user Dog (This will use state management to handle)

  //Fetch user's dog
  const userDogQuery = useQuery({
    queryKey: 'fetchDogById',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchDogById(accessToken, userDogId)

        return response as DogsDataBackend
      }
    },
    enabled: !!user,
  })

  // logic will be, the userId !== userDogUserId
  // if, else if
  if (
    !dogsQuery.isLoading &&
    dogsQuery.data &&
    !userDogQuery.isLoading &&
    userDogQuery.data
  ) {
    const allDogs = dogsQuery.data
    const userDog = userDogQuery.data
    console.log(userDog, 'I am the userdog')

    const canMatchedDogs = allDogs.filter(
      (dog) => dog.userId !== userDog.userId,
    )
    console.log(canMatchedDogs, 'I am the canMatchdogs')
  }

  return (
    <>
      <div>
        <h1>I am the in the AddMatchPage</h1>
      </div>
    </>
  )
}

export default AddMatchPage
