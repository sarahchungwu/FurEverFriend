import { useAuth0 } from '@auth0/auth0-react'
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { deleteDog, fetchDogsList } from '../../apis/dogs'

function MyDogPage() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading } = useQuery({
    queryKey: 'fetchDogsList',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        return await fetchDogsList(accessToken)
      }
    },
    enabled: !!user,
  })

  const queryClient = useQueryClient()

  async function handleDelete(dogId: number) {
    const token = await getAccessTokenSilently()
    await deleteDog(token, dogId)
    queryClient.invalidateQueries('fetchDogsList')
  }

  return (
    <>
      <div className="flex flex-row justify-end mr-9 mt-14">
        <button
          type="submit"
          className=" bg-orange-200 w-12 h-12
        shadow-lg  text-yellow-950
        justify-center text-center  rounded-full  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 transform transition-transform hover:scale-150"
        >
          <Link to="/dogs/new">
            <FontAwesomeIcon icon={faPlus} className="text-3xl" />
          </Link>
        </button>
      </div>
      {!isLoading &&
        data &&
        data?.map((dog) => (
          <div
            className="profile-container mx-auto max-w-md p-8 text-center flex flex-col items-center mb-5 mt-8 w-10/12 bg-white rounded-lg bg-opacity-70"
            key={dog.id}
          >
            <button
              onClick={() => handleDelete(dog.id)}
              type="submit"
              className=" bg-white w-14 h-14 
         text-yellow-950 justify-center text-center  cursor-pointer transform transition-transform hover:scale-150"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-3xl text-yellow-950 pt-6 pb-6"
              />
            </button>

            <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-md mt-8 mb-8">
              <img
                src={dog.img ? `${dog.img} ` : '/image/defalutDogImg.png'}
                alt={`${dog.name} `}
                className="w-full h-full object-cover"
              />
            </div>

            <div className=" text-3xl font-bold mt-3 w-6/12 text-yellow-950">
              <h1 className="pt-3">{dog.name}</h1>
              <p className="text-lg mt-2">I am a {dog.personality} Dog</p>
            </div>
            <div className=" text-gray-600 mt-2 mb-8">
              <p>Age:{dog.age}</p>
              <p>Breed:{dog.breed}</p>
              <p>Gender:{dog.gender}</p>
            </div>
            <div className=" p-4 mt-3 rounded-l-md shadow-md w-11/12 bg-orange-200 bg-opacity-50">
              <div className="h-56 text-lg text-yellow-950 ">
                <p>{dog.description}</p>
              </div>
            </div>

            <button
              type="submit"
              className=" bg-orange-200  bg-opacity-70 w-9/12
        shadow-lg  text-yellow-950
        justify-center text-center py-2 px-4 mb-6 mt-6 rounded-lg  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 "
            >
              <Link to={`/dogs/${dog.id}`}>
                Edit
                <FontAwesomeIcon icon={faPen} className="ml-3" />
              </Link>
            </button>
          </div>
        ))}
    </>
  )
}

export default MyDogPage
