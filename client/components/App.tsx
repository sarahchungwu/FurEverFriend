import { Outlet } from 'react-router-dom'
import Header from './Header'

function App() {
  return (
    <div>
      <section className="main">
        <div className="left-top">
          <Header />
        </div>
      </section>
      <Outlet />
    </div>
  )
}

export default App
