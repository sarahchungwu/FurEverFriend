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
            className="w-32 h-40 bg-opacity-70 text-yellow-950 bg-orange-200 p-4 rounded-md shadow"
            key={dog.id}
          >
            <div className="text-center">
              <img
                src={`${dog.img}`}
                alt={`${dog.name}`}
                className="w-24 h-24  mx-auto"
              />
              <h2 className="text-l font-normal mt-2">{dog.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DogList
