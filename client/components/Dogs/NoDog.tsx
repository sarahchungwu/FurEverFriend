import { Link } from 'react-router-dom'

function NoDog() {
  return (
    <div className="flex flex-col text-xl text-center rounded-lg shadow-md p-4 w-4/5 bg-opacity-30 bg-orange-200 items-center">
      <h1>Seems like you haven&apos;t added your furrybaby</h1>
      <img src="/image/dog2.png" alt="nodog" className="mt-6" />
      <button className="flex gap-10 shadow-lg bg-orange-200 text-yellow-950 border-none rounded-md px-4 mb-9 mt-8 py-2 pb-2 cursor-pointer hover: hover:bg-orange-300">
        <Link to="/dogs/new"> Add your dog</Link>
      </button>
    </div>
  )
}

export default NoDog
