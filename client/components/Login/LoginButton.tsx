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
    <button className="bg-orange-600" onClick={handleLogin}>
      Log In
    </button>
  )
}

export default LoginButton
