import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useIsBusy } from '../../hooks/useIsBusy'
import Logo from '../Logo/Logo'

import Nav from '../Nav/Nav'

function Header() {
  const [navOpened, setNavOpened] = useState(false)
  const isBusy = useIsBusy()

  function toggleMenu() {
    setNavOpened((prevNavOpened) => !prevNavOpened)
  }

  return (
    <div className="pl-4 pt-3 pr-4 flex justify-between items-center">
      <Logo />

      {isBusy > 0 && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20">
          <img
            src="/image/loading_spinner.svg"
            alt="loading spinner"
            className="w-full h-full"
          />
        </div>
      )}
      {!navOpened && (
        <div>
          <button onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faBars}
              className="text-5xl  text-yellow-900"
            />
          </button>
        </div>
      )}

      {navOpened && (
        <button onClick={toggleMenu}>
          <FontAwesomeIcon
            icon={faBars}
            className="text-5xl  text-yellow-900 transition ease-in-out focus:-rotate-45 duration-300"
          />
        </button>
      )}

      <nav
        className={`fixed z-50 text-yellow-900 left-0 top-12 h-full w-full backdrop-filter backdrop-blur-md bg-opacity-5 shadow-transparent transition-all ease-in-out duration-200 ${
          navOpened ? 'opacity-100' : 'hidden'
        }`}
      >
        <Nav toggleMenu={toggleMenu} />
      </nav>
    </div>
  )
}

export default Header
