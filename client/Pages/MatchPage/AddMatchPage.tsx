import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchAllDogs, fetchDogById } from '../../apis/dogs'
import { DogsDataBackend } from '../../../models/dog'
import { useEffect, useState } from 'react'

function AddMatchPage() {
  const userDogId = Number(useParams().id)
  const { user, getAccessTokenSilently } = useAuth0()
  const [matchedDogs, setMatchedDogs] = useState<DogsDataBackend[]>([])

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

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-10/12">
        {matchedDogs.map((matchedDog) => (
          <div
            className="w-2/3  text-yellow-950 bg-opacity-30 bg-orange-200 p-4 rounded-lg shadow-md pb-4 mb-14 pt-8 transform transition-transform hover:scale-125"
            key={matchedDog.id}
          >
            <div className="text-center flex flex-col items-center">
              <img
                src={
                  matchedDog.img
                    ? `${matchedDog.img} `
                    : '/image/defalutDogImg.png'
                }
                alt={`${matchedDog.name} `}
                className="w-4/5 h- object-cover mx-auto rounded-lg"
              />

              <h2 className="text-l font-normal mt-2 ">{matchedDog.name}</h2>
              <button className="flex gap-10 h-2/3 bg-orange-200 shadow-lg text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 mt-28 transform transition-transform hover:scale-150">
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
