import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DogsData } from '../../../models/dog'

function AddDogFormPage() {
  const navigate = useNavigate()
  const [dogData, setDogData] = useState<DogsData>({
    name: '',
    img: '',
    breed: '',
    age: -1,
    personality: '',
    description: '',
  })

  const dogPersonalities = [
    {
      id: 1,
      personality: 'playful',
    },
    {
      id: 2,
      personality: 'friendly',
    },
    {
      id: 3,
      personality: 'calm',
    },
    {
      id: 4,
      personality: 'intelligent',
    },
    // Add more dogs with their respective IDs and personality traits
  ]

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value: string | number =
      name === 'age' ? parseInt(event.target.value) : event.target.value
    const newDogData = { ...dogData, [name]: value }
    setDogData(newDogData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('register form submitted', dogData)
    navigate('/home')
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    const currentDogData: DogsData = {
      ...dogData,
      personality: value,
    }
    setDogData(currentDogData)
  }

  return (
    <>
      <div className="mr-6 xl flex flex-col items-center ">
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 w-72">
          <h2>Introduct Your Special Fur Baby to us</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col drop-shadow-xl">
          <div className="flex flex-col ">
            <label htmlFor="name" className="pl-7 pb-2 text-lg text-yellow-950">
              name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Bubble"
              value={dogData.name}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="age" className="pl-7 pb-2 text-lg text-yellow-950">
              age:
            </label>
            <input
              id="age"
              type="text"
              name="age"
              placeholder="e.g. 2"
              value={dogData.age === -1 ? '' : dogData.age}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>
          <div className="flex flex-col ">
            <label
              htmlFor="breed"
              className="pl-7 pb-2 text-lg text-yellow-950"
            >
              breed:
            </label>
            <input
              id="breed"
              type="text"
              name="breed"
              placeholder="e.g. pug"
              value={dogData.breed}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="img" className="pl-7 pb-2 text-lg text-yellow-950">
              Image:
            </label>
            <input
              id="img"
              type="text"
              name="img"
              placeholder="e.g. https://XXXXXX.jpg"
              value={dogData.img}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="img" className="pl-7 pb-2 text-lg text-yellow-950">
              Personality:
            </label>

            <select
              name="personality"
              id="personality"
              value={dogData.personality}
              onChange={handleSelect}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
            >
              <option value="">Select Personality</option>

              {dogPersonalities.map((dogPers) => (
                <option key={dogPers.id} value={dogPers.personality}>
                  {dogPers.personality}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="img" className="pl-7 pb-2 text-lg text-yellow-950">
              Discription:
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder=" e.g.my dog love playing water"
              value={dogData.description}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-orange-200 
          shadow-lg  text-yellow-950
          justify-center text-center py-2 px-4 mb-6 ml-6 mt-10 rounded-lg  cursor-pointer hover:bg-orange-300
          focus:bg-orange-300 "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default AddDogFormPage
