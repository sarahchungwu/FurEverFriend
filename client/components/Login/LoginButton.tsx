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
      className="flex flex-col items-center shadow-lg bg-orange-200 text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover: hover:bg-orange-300 mx-4 w-24"
    >
      Login
    </button>
  )
}

export default LoginButton
