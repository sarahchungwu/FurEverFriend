import DogList from '../../components/Dogs/DogList'
import NoDog from '../../components/Dogs/NoDog'

function HomePage() {
  return (
    <>
      <div>
        <h1>I am in the HomePage</h1>
      </div>
      <div>
        <DogList />
        <NoDog />
      </div>
      <div>
        <button>start a Match</button>
        <button>View match</button>
      </div>
    </>
  )
}

export default HomePage
