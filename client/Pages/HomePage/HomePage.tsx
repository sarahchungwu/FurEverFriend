import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
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
        return await fetchDogsList(accessToken)
      }
      return [] // Return an empty array as a fallback
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
              </div>
            ) : (
              <NoDog />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default HomePage
