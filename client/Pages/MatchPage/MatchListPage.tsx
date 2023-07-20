import { useAuth0 } from '@auth0/auth0-react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useQueryClient } from 'react-query'
import { DogsDataBackend } from '../../../models/dog'
import { fetchDogsList } from '../../apis/dogs'
import { fetchMatchList } from '../../apis/matches'
import MatchList from '../../components/MatchList/MatchList'

function MatchListPage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
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

  // async function handleDelete(dogId: number) {
  //   const token = await getAccessTokenSilently()
  //   await deleteDog(token, dogId)
  //   queryClient.invalidateQueries('fetchDogsList')
  // }

  return (
    <>
      {!dogListQuery.isLoading && dogListQuery.data && (
        <MatchList data={dogListQuery.data} />
      )}
    </>
  )
}

export default MatchListPage
