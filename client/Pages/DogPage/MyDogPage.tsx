import { useAuth0 } from '@auth0/auth0-react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { deleteDog, fetchDogsList } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'
import DogCard from '../../components/Dogs/DogCard'

function MyDogPage() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: 'fetchDogsList',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        return await fetchDogsList(accessToken)
      }
    },
    enabled: !!user,
  })

  const queryClient = useQueryClient()

  async function handleDelete(dogId: number) {
    const token = await getAccessTokenSilently()
    await deleteDog(token, dogId)
    queryClient.invalidateQueries('fetchDogsList')
  }

  return (
    <>
      <div className="flex flex-row justify-end mr-9 mt-14">
        <button
          type="submit"
          className=" bg-orange-200 w-12 h-12
        shadow-lg  text-yellow-950
        justify-center text-center  rounded-full  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 transform transition-transform hover:scale-150"
        >
          <Link to="/dogs/new">
            <FontAwesomeIcon icon={faPlus} className="text-3xl" />
          </Link>
        </button>
      </div>
      {!isLoading &&
        data &&
        data?.map((dog: DogsDataBackend) => (
          <DogCard dog={dog} handleDelete={handleDelete} key={dog.id} />
        ))}
    </>
  )
}

export default MyDogPage
