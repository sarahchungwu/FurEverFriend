import { useAuth0 } from '@auth0/auth0-react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { DogsDataBackend } from '../../../models/dog'
import { fetchMatchList } from '../../apis/matches'

interface Props {
  data: DogsDataBackend[]
}

function MatchList(props: Props) {
  const dogListData = props.data
  const { user, getAccessTokenSilently } = useAuth0()
  const matchQuery = useQuery({
    queryKey: ['fetchMatchList', dogListData],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub && dogListData.length > 0) {
        const responses = await Promise.all(
          dogListData.map(async (dog) => {
            const response = await fetchMatchList(accessToken, dog.id)
            return response
          }),
        )
        return responses
      }
    },
    enabled: !!user && dogListData.length > 0,
  })

  if (matchQuery.isLoading) return 'Loading...'

  //Create a new array with the sub-array elements concatenated
  const mergedMatchData = matchQuery.data?.flat()

  //combine .filter() and .findIndex to reduce repetitive object
  const uniqueMatchData = mergedMatchData?.filter((item, index, array) => {
    return (
      index ===
      array.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item))
    )
  })

  return (
    <>
      {uniqueMatchData?.map((matchDog) => (
        <div
          key={matchDog.matchedDogId}
          className="flex flex-col items-center profile-container mx-auto max-w-md p-8 text-center  mb-5 mt-8 w-10/12 bg-white rounded-lg bg-opacity-70"
        >
          <h1 className="pt-3 text-3xl  text-yellow-950">
            Hey! meet {matchDog.dogName} and {matchDog.matchedUsername}
          </h1>
          <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-md mt-8 mb-8">
            <img
              src={`${matchDog.dogImg}`}
              alt={`${matchDog.dogName}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center text-3xl font-bold mt-3 w-1/3 text-yellow-950 "></div>
          <div className=" text-gray-600 mt-2 mb-8">
            <p>Age: {matchDog.dogAge}</p>
            <p>Breed: {matchDog.dogBreed}</p>
            <p>Gender: {matchDog.dogGender}</p>
            <p>Pesonality: {matchDog.dogPersonality}</p>
          </div>
          <div className=" p-4 mt-3 rounded-l-md shadow-md w-9/12 bg-orange-200 bg-opacity-50">
            <div className="h-100 p-2 text-lg text-yellow-950 ">
              <p>{matchDog.dogDescription}</p>
            </div>
          </div>
          <button
            type="submit"
            className=" bg-orange-200  w-9/12
        shadow-lg  text-yellow-950
        justify-center text-center py-2 px-4 mb-6 mt-8 rounded-lg  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 "
          >
            <Link to={`/dogs/matches/${matchDog.matchedUserId}`}>
              <FontAwesomeIcon icon={faEnvelope} className=" text-3xl" />
            </Link>
          </button>
        </div>
      ))}
    </>
  )
}

export default MatchList
