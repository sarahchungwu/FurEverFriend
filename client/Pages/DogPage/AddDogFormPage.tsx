import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { DogsData } from '../../../models/dog'
import { addDog } from '../../apis/dogs'
import InputField from '../../components/Dogs/InputField'
import PersonalitySelect from '../../components/Dogs/PersonalitySelect'
import SubmitButton from '../../components/Dogs/SubmitButton'

function AddDogFormPage() {
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const [dogData, setDogData] = useState<DogsData>({
    name: '',
    img: '',
    gender: '',
    breed: '',
    age: -1,
    personality: '',
    description: '',
  })

  const dogPersonalities = ['playful', 'friendly', 'calm', 'intelligent']

  // data is called and then mutated
  const mutations = useMutation({
    mutationFn: ({ dogData, token }: { dogData: DogsData; token: string }) =>
      addDog(dogData, token),
    onSuccess: async () => {
      queryClient.invalidateQueries('fetchDogsList')
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value: string | number =
      name === 'age' ? parseInt(event.target.value) : event.target.value
    const newDogData = { ...dogData, [name]: value }
    setDogData(newDogData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    mutations.mutate({ dogData, token })

    navigate('/dogs')
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
      <div className="mr-6 xl flex flex-col items-center">
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 w-72">
          <h2>Introduce Your Special Fur Baby to us</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col drop-shadow-xl w-full"
        >
          <InputField
            label="name"
            name="name"
            type="text"
            placeholder="e.g. Your dog's name"
            value={dogData.name}
            onChange={handleChange}
          />
          <InputField
            label="age"
            name="age"
            type="text"
            placeholder="e.g. 2"
            value={dogData.age === -1 ? '' : dogData.age}
            onChange={handleChange}
          />
          <InputField
            label="breed"
            name="breed"
            type="text"
            placeholder="e.g. pug"
            value={dogData.breed}
            onChange={handleChange}
          />
          <InputField
            label="gender"
            name="gender"
            type="text"
            placeholder="e.g. female or Male"
            value={dogData.gender}
            onChange={handleChange}
          />
          <InputField
            label="Image"
            name="img"
            type="text"
            placeholder="e.g. https://XXXXXX.jpg"
            value={dogData.img}
            onChange={handleChange}
          />
          <PersonalitySelect
            personalities={dogPersonalities}
            selectedPersonality={dogData.personality}
            onPersonalityChange={handleSelect}
          />
          <InputField
            label="Description"
            name="description"
            type="text"
            placeholder="e.g. my dog loves playing water"
            value={dogData.description}
            onChange={handleChange}
          />
          <SubmitButton />
        </form>
      </div>
    </>
  )
}

export default AddDogFormPage
