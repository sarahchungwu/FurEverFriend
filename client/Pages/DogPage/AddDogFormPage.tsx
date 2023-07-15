function AddDogFormPage() {
  return (
    <>
      <div className="mr-6">
        <div className="text-center text-yellow-950 text-2xl font-medium my-14 ">
          <h2>Introduct Your Special Fur Baby to us</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col drop-shadow-xl">
          <div className="flex flex-col ">
            <label htmlFor="name" className="pl-7 pb-2 text-lg text-yellow-950">
              name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Sarah"
              value={userData.name}
              onChange={handleChange}
              className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
              required
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddDogFormPage
