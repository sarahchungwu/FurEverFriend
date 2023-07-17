import { useAuth0 } from '@auth0/auth0-react'
import { faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { DogsDataBackend } from '../../../models/dog'
import { fetchDogsList } from '../../apis/dogs'
import { fetchProfiles } from '../../apis/profile'
import DogList from '../../components/Dogs/DogList'
import NoDog from '../../components/Dogs/NoDog'

function HomePage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const dogListQuery = useQuery({
    queryKey: 'fetchDogsList',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchDogsList(accessToken)

        return response as DogsDataBackend[]
      }
    },
    enabled: !!user,
  })

  const profileQuery = useQuery({
    queryKey: 'fetchProfiles',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchProfiles(accessToken)

        return response
      }
    },
    enabled: !!user,
  })
  return (
    <>
      <div>
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 ">
          {!profileQuery.isLoading && profileQuery.data && (
            <h1 className="mb-3 ">Hey {profileQuery.data?.username},</h1>
          )}
          <h1>come and find your fur buddies!</h1>
        </div>

        {!dogListQuery.isLoading && dogListQuery.data && (
          <div className="flex flex-col first-line:w-5/6 items-center">
            {dogListQuery.data.length > 0 ? (
              <div className="flex flex-col items-center">
                <DogList data={dogListQuery.data} />
                <button className="flex gap-10 h-2/3 bg-orange-200 shadow-lg text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 mt-28 transform transition-transform hover:scale-150">
                  start a Match
                </button>
              </div>
            ) : (
              <NoDog />
            )}
          </div>
        )}
        <div className="flex flex-col items-center mt-10">
          {/* <button className="flex gap-10 bg-orange-200 shadow-lg  text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 ">
            View match
          </button> */}
          <div className="mt-36 ">
            <FontAwesomeIcon
              icon={faMessage}
              className="text-4xl text-yellow-900 mb-5"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
