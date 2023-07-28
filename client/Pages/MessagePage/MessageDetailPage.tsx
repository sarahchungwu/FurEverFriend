import { useAuth0 } from '@auth0/auth0-react'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { MessageFromBackend } from '../../../models/messages'
import { fetchMessageById } from '../../apis/messages'

function MessageDetailPage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const messageId = Number(useParams().id)
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

  return (
    <>
      {!messageQuery.isLoading && messageQuery.data && (
        <div className="min-h-screen p-8 text-yellow-950 ">
          <h1 className="text-2xl font-bold text-center mb-11">My Message</h1>

          <div className="flex flex-col  items-center bg-orange-200 bg-opacity-50 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 mt-10">
            <h2 className=" text-2xl font-bold mb-4 text-center ">
              {messageQuery.data.senderName}
            </h2>
            <div className=" p-20 ">
              <p className="w-5/6 text-lg">{messageQuery.data.text}</p>
            </div>
            <button
              type="submit"
              className=" bg-orange-200  w-9/12
        shadow-lg  text-yellow-950
        justify-center text-center py-2 px-4 mb-6 mt-6 rounded-lg  cursor-pointer hover:bg-orange-300
        focus:bg-orange-300 "
            >
              <Link to={`/messages/${messageQuery.data.id}/add`}>
                Reply
                <FontAwesomeIcon icon={faReply} className="ml-3 text-xl" />
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageDetailPage
