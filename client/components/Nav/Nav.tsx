import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  toggleMenu: () => void
}

function Nav(props: Props) {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()
  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        // make sure in the auth0 application is
        redirect_uri: `${window.location.origin}/home`,
      },
    })
  }

  function handleLogout() {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  function goTo(link: string) {
    props.toggleMenu()
    navigate(link)
  }

  return (
    <nav className="pt-16 pl-4 flex ">
      <ul className="text-3xl tracking-wide">
        <li>
          <button onClick={() => goTo('/home')} disabled={!isAuthenticated}>
            Home
          </button>
        </li>
        <li>
          <button onClick={() => goTo('/dogs')} disabled={!isAuthenticated}>
            My Dogs
          </button>
        </li>
        <li>
          <button onClick={() => goTo('/profile')} disabled={!isAuthenticated}>
            My Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => goTo('/dogs/matches')}
            disabled={!isAuthenticated}
          >
            My Match
          </button>
        </li>
        <li>
          <button onClick={() => goTo('/messages')} disabled={!isAuthenticated}>
            My Message
          </button>
        </li>
        <li>
          {!isAuthenticated && <button onClick={handleLogin}>Log in</button>}
        </li>
        <li>
          {isAuthenticated && <button onClick={handleLogout}>Log out</button>}
        </li>
      </ul>
    </nav>
  )
}

export default Nav
