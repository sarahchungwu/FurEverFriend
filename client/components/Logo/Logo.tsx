import { Link } from 'react-router-dom'

function Title() {
  return (
    <Link to="/">
      <h1 className="hover:scale-110 text-5xl  font-style-script text-yellow-900">
        FurEverFriend
      </h1>
    </Link>
  )
}

export default Title
