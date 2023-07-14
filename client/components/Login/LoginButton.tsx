import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/home`,
      },
    })
  }

  return (
    // will later use the storty book for button to better work with UI design
    <button
      onClick={handleLogin}
      className="flex gap-10 bg-orange-200 shadow-lg  text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 "
    >
      Log In
    </button>
  )
}

export default LoginButton
