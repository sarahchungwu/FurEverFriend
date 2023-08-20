import { DogsDataBackend } from '../../../models/dog'

function MatchedDogCard({
  matchedDog,
  handleAccept,
}: {
  matchedDog: DogsDataBackend
  handleAccept: (id: number) => void
}) {
  return (
    <div
      className="w-2/3  text-yellow-950 bg-opacity-30 bg-orange-200 p-4 rounded-lg shadow-md pb-4 mb-14 mt-16 pt-8 transform transition-transform hover:scale-125"
      key={matchedDog.id}
    >
      <div className="text-center flex flex-col items-center ">
        <img
          src={
            matchedDog.img ? `${matchedDog.img} ` : '/image/defalutDogImg.png'
          }
          alt={`${matchedDog.name} `}
          className="w-4/5 h- object-cover mx-auto rounded-lg"
        />

        <h2 className="text-ls font-bold mt-2 ">{matchedDog.name}</h2>
        <h2 className="text-sm font-normal mt-2 ">
          {matchedDog.age} years old
        </h2>
        <h2 className="text-sm font-normal mt-2 ">{matchedDog.breed}</h2>
        <h2 className="text-sm font-normal mt-2 ">{matchedDog.gender}</h2>
        <h2 className="text-sm font-normal mt-2 ">
          I am a {matchedDog.personality} dog
        </h2>
        <h2 className="text-sm font-normal mt-2  pt-4">
          {matchedDog.description}
        </h2>

        <button
          onClick={() => handleAccept(matchedDog.id)}
          className="flex gap-10 h-2/3 bg-orange-200 shadow-lg text-yellow-950 border-none rounded-md px-4 py-2 cursor-pointer hover:bg-orange-300 focus:bg-orange-300 mt-28 transform transition-transform hover:scale-150"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default MatchedDogCard
