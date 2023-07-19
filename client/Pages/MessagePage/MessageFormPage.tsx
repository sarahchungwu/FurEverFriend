import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { MessageFromBackend } from '../../../models/messages'
import { fetchMessageById } from '../../apis/messages'

function MessageFormPage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const messageId = Number(useParams().id)
  // const [messageData, setMessageData] = useState<>
  const messageQuery = useQuery({
    queryKey: 'fetchDogById',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchMessageById(accessToken, messageId)

        return response as MessageFromBackend
      }
    },
    enabled: !!user,
  })

  console.log('I am in the FormPage', messageQuery.data)

  return (
    <>
      {!messageQuery.isLoading && messageQuery.data && (
        <div className="min-h-screen p-8 text-yellow-950 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <label
              htmlFor="bio"
              className=" pb-2 text-2xl text-yellow-950 font-bold mt-8"
            >
              your reply to {messageQuery.data.sender_name}
            </label>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="your reply message"
              value=""
              className=" flex flex-row  bg-orange-200 bg-opacity-50 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 mt-10"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-orange-200  
        shadow-lg  text-yellow-950 w-2/6
        justify-center text-center py-2 px-4 mb-6 mt-6 rounded-lg  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 "
          >
            Send
          </button>
        </div>
      )}
    </>
  )
}

export default MessageFormPage
