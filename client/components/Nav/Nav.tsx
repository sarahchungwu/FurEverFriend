import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  toggleMenu: () => void
}

function Nav(props: Props) {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  function handleLogin() {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/my-songs`,
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
    <nav className="pt-16 pl-4 flex">
      I am in the Nav Bar
      <ul className="text-3xl">
        <li>
          <button onClick={() => goTo('/home')}>Home</button>
        </li>
        <li>
          <button onClick={() => goTo('/dogs')}>My Dogs</button>
        </li>
        <li>
          <button onClick={() => goTo('/profile')}>My Profile</button>
        </li>
        <li>
          <button onClick={() => goTo('/dogs/matches')}>My Match</button>
        </li>
        <li>
          <button onClick={() => goTo('/messages')}>My message</button>
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
