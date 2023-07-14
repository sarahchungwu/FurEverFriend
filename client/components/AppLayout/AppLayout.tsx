import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

function AppLayout() {
  return (
    <>
      <div className="min-h-screen  bg-orange-50">
        <Header />
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout
