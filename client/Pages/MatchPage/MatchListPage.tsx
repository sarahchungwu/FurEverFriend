import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { DogsDataBackend } from '../../../models/dog'
import { fetchDogsList } from '../../apis/dogs'
import MatchList from '../../components/MatchList/MatchList'

function MatchListPage() {
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

  return (
    <>
      {!dogListQuery.isLoading && dogListQuery.data && (
        <MatchList data={dogListQuery.data} />
      )}
    </>
  )
}

export default MatchListPage
