import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogById, fetchDogsList } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'

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

  console.log(dogsQuery.data, 'I am in the DogQuery')

  // logic will be, the userId !== userDogUserId
  // if, else if
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

  console.log('I am the userDogQuery', userDogQuery.data)

  return (
    <>
      <div>
        <h1>I am the in the AddMatchPage</h1>
      </div>
    </>
  )
}

export default AddMatchPage
