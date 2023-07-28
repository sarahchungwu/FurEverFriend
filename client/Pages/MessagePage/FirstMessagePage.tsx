import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { AddMessage } from '../../../models/messages'
import { addMessage } from '../../apis/messages'

function FirstMessagePage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const { id } = useParams()
  //receiverId will be an empty string if id is undefined
  const receiverId = id || ''

  const queryClient = useQueryClient()

  const [messageData, setMessageData] = useState<AddMessage>({
    receiver_id: receiverId,
    text: '',
  })

  const mutations = useMutation({
    mutationFn: ({
      messageData,
      token,
    }: {
      messageData: AddMessage
      token: string
    }) => addMessage(messageData, token),
    onSuccess: async () => {
      console.log('added, I am in message the mutation')
      queryClient.invalidateQueries('fetchMessagesList')
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    const newMessageData = { ...messageData, [name]: value }
    setMessageData(newMessageData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    mutations.mutate({ messageData, token })

    // will navigate to Thankyou page later
    navigate('/home')
  }

  return (
    <>
      <div className="min-h-screen p-8 text-yellow-950 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col drop-shadow-xl items-center h-3/4"
        >
          <div className="flex flex-col items-center">
            <label
              htmlFor="text"
              className=" pb-2 text-2xl text-yellow-950 font-bold mt-8"
            >
              Start your conversation!
            </label>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="write your message"
              value={messageData.text}
              onChange={handleChange}
              className=" flex flex-row h-52 bg-orange-200 bg-opacity-50 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 mt-10"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-orange-200  
        shadow-lg  text-yellow-950 w-2/6
        justify-center text-center py-2 px-4 mb-6 mt-10 rounded-lg  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 "
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default FirstMessagePage
