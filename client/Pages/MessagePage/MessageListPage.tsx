import { useAuth0 } from '@auth0/auth0-react'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from 'react-query'
import { fetchMessagesList } from '../../apis/messages'

function MessageListPage() {
  const { user, getAccessTokenSilently } = useAuth0()

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

  console.log('I am the messageQuery', messageQuery.data)

  return (
    <>
      <div className="min-h-screen p-8 text-yellow-950">
        <h1 className="text-2xl font-bold text-center mb-11">My Message</h1>
        <ul className="space-y-8">
          {!messageQuery.isLoading &&
            messageQuery.data &&
            messageQuery.data.map((message) => (
              <div key={message.id}>
                <li>
                  <div className=" bg-orange-200 bg-opacity-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-center">
                      {message.sender_name}
                    </h2>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed et dolor vel libero dapibus mollis ut at elit.
                    </p>
                    <div className="flex flex-row justify-end">
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        className="text-3xl"
                      />
                    </div>
                  </div>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </>
  )
}

export default MessageListPage
