import { useAuth0 } from '@auth0/auth0-react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQueryClient } from 'react-query'
import { fetchDogsList } from '../../apis/dogs'

function MatchListPage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  // const dogQuery = useQuery({
  //   queryKey: 'fetchDogsList',
  //   queryFn: async () => {
  //     const accessToken = await getAccessTokenSilently()
  //     if (user && user.sub) {
  //       const response = await fetchDogsList(accessToken)

  //       return response
  //     }
  //   },
  //   enabled: !!user,
  // })

  // async function handleDelete(dogId: number) {
  //   const token = await getAccessTokenSilently()
  //   await deleteDog(token, dogId)
  //   queryClient.invalidateQueries('fetchDogsList')
  // }

  return (
    <>
      <div className="flex flex-row justify-end mr-9 mt-14"></div>
      {/* {!dogQuery.isLoading &&
        dogQuery.data &&
        dogQuery.data.map((dog) => ( */}
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
        </div>
        <div className=" p-4 mt-3 rounded-l-md shadow-md w-9/12 bg-orange-200 bg-opacity-50">
          <div className="h-40 p-2 text-lg text-yellow-950 ">
            <p>description</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MatchListPage
