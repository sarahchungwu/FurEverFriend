import LoginButton from '../../components/Login/LoginButton'
import RegisterButton from '../../components/Register/RegisterButton'

function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-red-50 min-h-screen p-20 ">
        <div className="mb-20 flex flex-col justify-start pl-6 ">
          <h1 className="text-2xl text-pink-600 pb-2">UNITE </h1>
          {/* <h1 className="text-2xl text-pink-600 pb-2">DOGS AND OWNERS</h1> */}
          <h1 className="text-3xl text-pink-600 pb-2">IGNITE LIFELONG</h1>
          <h1 className="text-4xl text-pink-600">FRIENDSHIPS.</h1>
        </div>

        <div className="space-x-4 flex flex-row">
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </>
  )
}

export default LandingPage
