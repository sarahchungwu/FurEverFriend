import DogList from '../../components/DogList/DogList'

function HomePage() {
  return (
    <>
      <div>
        <h1>I am in the HomePage</h1>
      </div>
      <div>
        <DogList />
      </div>
      <div>
        <button>start a Match</button>
        <button>View match</button>
      </div>
    </>
  )
}

export default HomePage
