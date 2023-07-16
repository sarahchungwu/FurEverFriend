import { useAuth0 } from '@auth0/auth0-react'
import { faHeart, faPen, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchProfiles } from '../../apis/profile'

function ProfilePage() {
  const { user, getAccessTokenSilently } = useAuth0()

  const profileQuery = useQuery({
    queryKey: 'fetchProfiles',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchProfiles(accessToken)

        return response
      }
    },
    enabled: !!user,
  })

  return (
    <>
      {!profileQuery.isLoading && profileQuery.data && (
        <div className="profile-container mx-auto max-w-md p-8 text-center flex flex-col items-center ">
          <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-md mt-8 mb-8 ">
            <img
              src="image/profile-default-img.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className=" text-3xl font-bold mt-6 w-1/3 text-yellow-950">
            <h1 className="pt-3">{profileQuery.data.username}</h1>
          </div>
          <div className=" text-gray-600 mt-2 mb-8">
            <p>{profileQuery.data.pronouns}</p>
          </div>
          <div className=" p-4 mt-6 rounded-l-md shadow-md w-9/12 bg-orange-200 bg-opacity-70">
            <div className="bio-container h-48 p-2 text-lg text-yellow-950 ">
              <p>{profileQuery.data.bio}</p>
            </div>
          </div>

          <button
            type="submit"
            className=" bg-orange-200 w-9/12
          shadow-lg  text-yellow-950
          justify-center text-center py-2 px-4 mb-6 mt-16 rounded-lg  cursor-pointer hover:bg-orange-300
          focus:bg-orange-300 "
          >
            <Link to="/profile/edit">
              Edit
              <FontAwesomeIcon icon={faPen} className="ml-3" />
            </Link>
          </button>
        </div>
      )}
    </>
  )
}

export default ProfilePage
