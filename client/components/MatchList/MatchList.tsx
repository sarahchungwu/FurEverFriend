import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { DogsDataBackend } from '../../../models/dog'
import { fetchMatchList } from '../../apis/matches'

interface Props {
  data: DogsDataBackend[]
}

function MatchList(props: Props) {
  const dogListData = props.data
  const { user, getAccessTokenSilently } = useAuth0()
  console.log('I am in the DogList Data', dogListData)
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

  console.log('I am the dogMatch dog', matchQuery.data)

  return (
    <div className="profile-container mx-auto max-w-md p-8 text-center flex flex-col items-center mb-5 mt-8 w-10/12 bg-white rounded-lg bg-opacity-70">
      <h1 className="pt-3 text-3xl  text-yellow-950">Hey, meet the dog</h1>
      <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-md mt-8 mb-8">
        <img
          src="/image/defalutDogImg.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" text-3xl font-bold mt-3 w-1/3 text-yellow-950">
        <p className="text-lg">owner: ownername</p>
      </div>
      <div className=" text-gray-600 mt-2 mb-8">
        <p>Age:</p>
        <p>Breed:</p>
        <p>Gender:</p>
        <p>Pesonality:</p>
      </div>
      <div className=" p-4 mt-3 rounded-l-md shadow-md w-9/12 bg-orange-200 bg-opacity-50">
        <div className="h-40 p-2 text-lg text-yellow-950 ">
          <p>description</p>
        </div>
      </div>
    </div>
  )
}

export default MatchList
