import DogList from '../../components/Dogs/DogList'
import NoDog from '../../components/Dogs/NoDog'

function HomePage() {
  return (
    <>
      <div>
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 ">
          <h1>I am in the HomePage</h1>
        </div>

        <div className="flex flex-col first-line:w-5/6 items-center">
          <DogList />
          <NoDog />
        </div>
        <div>
          <button className="flex gap-10 bg-orange-200 shadow-lg  text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 ">
            start a Match
          </button>
          <button className="flex gap-10 bg-orange-200 shadow-lg  text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 ">
            View match
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePage
