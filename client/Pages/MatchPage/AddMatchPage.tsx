import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogById } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'
import { useEffect, useState } from 'react'
import { AddMatch } from '../../../models/matches'
import { addNewMatch } from '../../apis/matches'
import MatchedDogCard from '../../components/MatchDog/MatchDogCard'

function AddMatchPage() {
  const userDogId = Number(useParams().id)
  const navigate = useNavigate()
  const { user, getAccessTokenSilently } = useAuth0()
  const [matchedDogs, setMatchedDogs] = useState<DogsDataBackend[]>([])
  const queryClient = useQueryClient()

  // Fetch all dogs
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

  useEffect(() => {
    if (
      !dogsQuery.isLoading &&
      dogsQuery.data &&
      !userDogQuery.isLoading &&
      userDogQuery.data
    ) {
      const allDogs = dogsQuery.data
      const userDog = userDogQuery.data

      const canMatchedDogs = allDogs.filter(
        (dog) => dog.userId !== userDog.userId,
      )

      const newMatchedDogs = canMatchedDogs.filter(
        (matchedDog) =>
          (matchedDog.breed === userDog.breed &&
            matchedDog.gender !== userDog.gender) ||
          matchedDog.personality === userDog.personality ||
          matchedDog.age === userDog.age,
      )

      // Set the matched dogs in state
      setMatchedDogs(newMatchedDogs)
    }
  }, [
    dogsQuery.data,
    dogsQuery.isLoading,
    userDogQuery.data,
    userDogQuery.isLoading,
  ])

  //matchData is mutated
  const mutations = useMutation({
    mutationFn: ({
      matchDogData,
      userDogId,
      token,
    }: {
      matchDogData: AddMatch
      userDogId: number
      token: string
    }) => addNewMatch(matchDogData, userDogId, token),
    onSuccess: async () => {
      queryClient.invalidateQueries('fetchMatchList')
    },
  })

  async function handleAccept(matchedDogId: number) {
    const matchDogData = {
      dogId: userDogId,
      matchedDogId: matchedDogId,
    }
    const token = await getAccessTokenSilently()
    mutations.mutate({ matchDogData, userDogId, token })

    navigate('/dogs/matches')
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-10/12">
        {matchedDogs.map((matchedDog) => (
          <MatchedDogCard
            matchedDog={matchedDog}
            handleAccept={handleAccept}
            key={matchedDog.id}
          />
        ))}
      </div>
    </>
  )
}

export default AddMatchPage
