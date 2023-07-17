import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { UpdateUsersData, UserData } from '../../../models/user'
import { updateProfile } from '../../apis/profile'

function EditProfilePage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [userData, setUserData] = useState<UpdateUsersData>({
    username: '',
    pronouns: '',
    bio: '',
  })

  // data is called and then mutated
  const mutations = useMutation({
    mutationFn: ({
      userData,
      token,
    }: {
      userData: UpdateUsersData
      token: string
    }) => updateProfile(userData, token),
    onSuccess: async () => {
      console.log('added, I am in the update mutation')
      queryClient.invalidateQueries('fetchProfiles')
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    const upDatedUserData = { ...userData, [name]: value }
    setUserData(upDatedUserData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // console.log('register form submitted', userData)
    const token = await getAccessTokenSilently()
    mutations.mutate({ userData, token })
    navigate('/home')
  }

  return (
    <>
      <div className="mr-6">
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 ">
          <h2>UPDATE YOUR PROFILE</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col drop-shadow-xl">
          <div className="flex flex-col ">
            <label htmlFor="name" className="pl-7 pb-2 text-lg text-yellow-950">
              Your name
            </label>
            <input
              id="name"
              type="text"
              name="username"
              placeholder="e.g. Sarah"
              value={userData.username}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="pronouns"
              className="pl-7 pb-2 text-lg text-yellow-950"
            >
              Pronouns
            </label>
            <input
              type="text"
              id="pronouns"
              name="pronouns"
              placeholder="e.g. She/her, He/his, They/them"
              value={userData.pronouns}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="bio" className="pl-7 pb-2 text-lg text-yellow-950">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              id="bio"
              placeholder=""
              value={userData.bio}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 h-20 rounded-sm"
              required
            />
          </div>

          <button
            type="submit"
            className=" bg-orange-200 
          shadow-lg  text-yellow-950
          justify-center text-center py-2 px-4 mb-6 ml-6 mt-10 rounded-lg  cursor-pointer hover:bg-orange-300
          focus:bg-orange-300 "
          >
            Update
          </button>
        </form>
      </div>
    </>
  )
}

export default EditProfilePage
