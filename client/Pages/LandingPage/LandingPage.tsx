import LoginButton from '../../components/Login/LoginButton'
import RegisterButton from '../../components/Register/RegisterButton'

function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-orange-50 min-h-screen p-20 bg-cover bg-cente">
        <div className="mb-20 flex flex-col justify-start pl-6 ">
          <h1 className="text-2xl text-yellow-900 pb-2">UNITE </h1>
          <h1 className="text-3xl text-yellow-900 pb-2">IGNITE LIFELONG</h1>
          <h1 className="text-4xl text-yellow-900">FRIENDSHIPS.</h1>
          <img src="../../../public/image/Dog1.png" alt="dogs" />
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
