import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

function AppLayout() {
  return (
    <div className="bg-gray-700">
      <h1>I am in the app Layout Page</h1>
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
