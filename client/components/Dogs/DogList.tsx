import { Link } from 'react-router-dom'
import { DogsDataBackend } from '../../../models/dog'

interface Props {
  data: DogsDataBackend[]
}
function DogList(props: Props) {
  const dogListData = props.data
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-10/12">
        {dogListData.map((dog: DogsDataBackend) => (
          <div
            className="w-2/3  text-yellow-950 bg-opacity-30 bg-orange-200 p-4 rounded-lg shadow-md pb-4 mb-14 pt-8 transform transition-transform hover:scale-125"
            key={dog.id}
          >
            <div className="text-center flex flex-col items-center">
              <img
                src={dog.img ? `${dog.img} ` : '/image/defalutDogImg.png'}
                alt={`${dog.name} `}
                className="w-4/5 h- object-cover mx-auto rounded-lg"
              />

              <h2 className="text-l font-normal mt-2 ">{dog.name}</h2>
              <button className="flex gap-10 h-2/3 bg-orange-200 shadow-lg text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 mt-28 transform transition-transform hover:scale-150">
                start a Match
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DogList
