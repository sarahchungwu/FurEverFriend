import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogsList } from '../../apis/dogs'

function AddMatchPage() {
  const userDogId = Number(useParams().id)
  const { user, getAccessTokenSilently } = useAuth0()
  const dogQuery = useQuery({
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

  console.log(dogQuery.data, 'I am in the DogQuery')

  // logic will be, the userId !== userDogUserId
  // if, else if

  return (
    <>
      <div>
        <h1>I am the in the AddMatchPage</h1>
      </div>
    </>
  )
}

export default AddMatchPage
