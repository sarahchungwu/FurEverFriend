import { useAuth0 } from '@auth0/auth0-react'
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { UpdateMessageStatus } from '../../../models/messages'
import { fetchMessagesList, updateMessageStatus } from '../../apis/messages'

function MessageListPage() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const newStatus = { isRead: true }

  const messageQuery = useQuery({
    queryKey: 'fetchMessagesList',
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await fetchMessagesList(accessToken)

        return response
      }
    },
    enabled: !!user,
  })

  const mutations = useMutation({
    mutationFn: ({
      messageId,
      newStatus,
      token,
    }: {
      messageId: number
      newStatus: UpdateMessageStatus
      token: string
    }) => updateMessageStatus(messageId, newStatus, token),
    onSuccess: async () => {
      queryClient.invalidateQueries('fetchMessagesList')
    },
  })

  async function handleClick(messageId: number, isRead: boolean) {
    if (!isRead) {
      const token = await getAccessTokenSilently()

      mutations.mutate({ messageId, token, newStatus })
    }
  }

  return (
    <>
      <div className="min-h-screen p-8 text-yellow-950">
        <h1 className="text-2xl font-bold text-center mb-11">My Message</h1>
        <ul className="space-y-8">
          {!messageQuery.isLoading &&
            messageQuery.data &&
            messageQuery.data.map((message) => (
              <li key={message.id}>
                <Link
                  to={`/messages/${message.id}`}
                  onClick={() => handleClick(message.id, message.is_read)}
                >
                  <div className=" bg-orange-200 bg-opacity-50 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 mt-10">
                    <h2 className="flex flex-row justify-start text-2xl font-bold mb-4 text-center ">
                      {message.sender_name}
                    </h2>

                    <div className="flex flex-row justify-end">
                      <p className="text-gray-600 mr-4">
                        {new Date(message.sent_at).toLocaleString()}
                      </p>
                      {message.is_read ? (
                        <FontAwesomeIcon
                          icon={faEnvelopeOpen}
                          className="text-2xl"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-2xl"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default MessageListPage
