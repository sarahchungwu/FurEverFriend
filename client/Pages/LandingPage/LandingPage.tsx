function LandingPage() {
  return (
    <>
      <div className="bg-red-200 flex flex-col items-center">
        <div className="w-32 bg-purple-400  ">
          <h1>Welcome to the FurEverPage</h1>
        </div>
        <div className="w-32 bg-indigo-400">
          <h1>Slogon</h1>
        </div>
        <div>
          <button className="bg-lime-600">Sign up</button>
          <button className="bg-yellow-800">Login</button>
        </div>
      </div>
    </>
  )
}

export default LandingPage
