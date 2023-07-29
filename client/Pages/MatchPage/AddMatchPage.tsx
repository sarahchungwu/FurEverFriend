import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogById } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'
import { useEffect, useState } from 'react'
import { AddMatch } from '../../../models/matches'
import { addNewMatch } from '../../apis/matches'

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
      console.log('I am in the mutation')
    },
  })

  async function handleAccept(matchedDogId: number) {
    // const token = await getAccessTokenSilently()
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
          <div
            className="w-2/3  text-yellow-950 bg-opacity-30 bg-orange-200 p-4 rounded-lg shadow-md pb-4 mb-14 mt-16 pt-8 transform transition-transform hover:scale-125"
            key={matchedDog.id}
          >
            <div className="text-center flex flex-col items-center ">
              <img
                src={
                  matchedDog.img
                    ? `${matchedDog.img} `
                    : '/image/defalutDogImg.png'
                }
                alt={`${matchedDog.name} `}
                className="w-4/5 h- object-cover mx-auto rounded-lg"
              />

              <h2 className="text-ls font-bold mt-2 ">{matchedDog.name}</h2>
              <h2 className="text-sm font-normal mt-2 ">
                {matchedDog.age} years old
              </h2>
              <h2 className="text-sm font-normal mt-2 ">{matchedDog.breed}</h2>
              <h2 className="text-sm font-normal mt-2 ">{matchedDog.gender}</h2>
              <h2 className="text-sm font-normal mt-2 ">
                I am a {matchedDog.personality} dog
              </h2>
              <h2 className="text-sm font-normal mt-2  pt-4">
                {matchedDog.description}
              </h2>

              <button
                onClick={() => handleAccept(matchedDog.id)}
                className="flex gap-10 h-2/3 bg-orange-200 shadow-lg text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 mt-28 transform transition-transform hover:scale-150"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AddMatchPage
