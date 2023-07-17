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
            className="w-2/3  text-yellow-950 bg-opacity-30 bg-orange-200 p-4 rounded-lg shadow-md pb-4 mb-8 pt-8"
            key={dog.id}
          >
            <div className="text-center">
              <img
                src={`${dog.img}`}
                alt={`${dog.name}`}
                className="w-4/5 h- object-cover mx-auto rounded-lg"
              />
              <h2 className="text-l font-normal mt-2 ">{dog.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DogList
