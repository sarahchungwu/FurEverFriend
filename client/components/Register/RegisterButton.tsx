import { useAuth0 } from '@auth0/auth0-react'

function RegisterButton() {
  const { loginWithRedirect } = useAuth0()

  function handleRegister() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
        redirect_uri: `${window.location.origin}/register`,
      },
    })
  }

  return (
    <button
      onClick={handleRegister}
      className="flex gap-10 bg-red-300 text-rose-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-rose-400"
    >
      Register
    </button>
  )
}

export default RegisterButton
