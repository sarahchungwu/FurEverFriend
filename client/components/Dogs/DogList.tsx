import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { DogsDataBackend } from '../../../models/dog'
import { fetchDogsList } from '../../apis/dogs'

function DogList() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { data, isLoading } = useQuery({
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
  console.log('I am react query', data)

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-10/12">
        {!isLoading &&
          data &&
          data.map((dog: DogsDataBackend) => (
            <div
              className="w-32 h-40 bg-opacity-70 text-yellow-950 bg-orange-200 p-4 rounded-md shadow"
              key={dog.id}
            >
              <div className="text-center">
                <img
                  src={`${dog.img}`}
                  alt={`${dog.name}`}
                  className="w-24 h-24  mx-auto"
                />
                <h2 className="text-l font-normal mt-2">{dog.name}</h2>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default DogList
