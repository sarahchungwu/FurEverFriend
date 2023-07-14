import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { UserData } from '../../../models/user'

function RegisterPage() {
  const { user, getAccessTokenSilently } = useAuth0()

  // calls the locations

  // const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    pronouns: '',
    bio: '',
  })

  // data is called and then mutated
  useEffect(() => {
    if (user) {
      Promise.resolve(user)
        .then((resolvedUser) => {
          if (resolvedUser.email && resolvedUser.sub) {
            const userDraftData: UserData = {
              ...userData,
              email: resolvedUser.email,
            }

            setUserData(userDraftData)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [user])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    const newUserData = { ...userData, [name]: value }
    setUserData(newUserData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('register form submitted', userData)
  }

  return (
    <>
      <div className="mr-6">
        <div className="text-center text-2xl font-semibold my-5">
          <h2>Tell us about yourself</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col drop-shadow-xl">
          <div className="flex flex-col ">
            <label htmlFor="name" className="pl-7 pb-2 text-lg">
              Your name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Sarah"
              value={userData.name}
              onChange={handleChange}
              className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="pronouns" className="pl-7 pb-2 text-lg">
              Pronouns
            </label>
            <input
              type="text"
              name="pronouns"
              placeholder="e.g. She/her, He/his, They/them"
              value={userData.pronouns}
              onChange={handleChange}
              className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="bio" className="pl-7 pb-2 text-lg">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              placeholder=""
              value={userData.bio}
              onChange={handleChange}
              className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 h-20 rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="  bg-orange-200 
          shadow-lg  text-yellow-950
          justify-center text-center py-2 px-4 mb-6 ml-6 mt-10 rounded-lg  cursor-pointer hover:bg-orange-300
          focus:bg-orange-300 "
          >
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
