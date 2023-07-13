import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

function AppLayout() {
  return (
    <div className="bg-darkPurple h-screen text-white">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
