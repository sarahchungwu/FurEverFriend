import { useAuth0 } from '@auth0/auth0-react'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchDogsList } from '../../apis/dogs'

function MyDogPage() {
  const { user, getAccessTokenSilently } = useAuth0()

  const dogQuery = useQuery({
    queryKey: 'fetchDogsList',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchDogsList(accessToken)

        return response
      }
    },
    enabled: !!user,
  })

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
      {!dogQuery.isLoading &&
        dogQuery.data &&
        dogQuery.data.map((dog) => (
          <div
            className="profile-container mx-auto max-w-md p-8 text-center flex flex-col items-center "
            key={dog.id}
          >
            <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-md mt-8 mb-8 ">
              <img
                src={dog.img ? `${dog.img} ` : '/image/defalutDogImg.png'}
                alt={`${dog.name} `}
                className="w-full h-full object-cover"
              />
            </div>

            <div className=" text-3xl font-bold mt-3 w-1/3 text-yellow-950">
              <h1 className="pt-3">{dog.name}</h1>
              <p className="text-lg">I am a {dog.personality} Dog</p>
            </div>
            <div className=" text-gray-600 mt-2 mb-8">
              <p>Age:{dog.age}</p>
              <p>Breed:{dog.breed}</p>
              <p>Gender:{dog.gender}</p>
            </div>
            <div className=" p-4 mt-3 rounded-l-md shadow-md w-9/12 bg-orange-200 bg-opacity-70">
              <div className="bio-container h-40 p-2 text-lg text-yellow-950 ">
                <p>{dog.description}</p>
              </div>
            </div>

            <button
              type="submit"
              className=" bg-orange-200 w-9/12
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
