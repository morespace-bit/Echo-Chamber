export default function EditProfile() {
  return (
    <>
      {/* the main container */}
      <div className="absolute z-10 top-40 bg-zinc-300 w-90 p-4 rounded-xl shadow-2xl shadow-blue-400">
        {/* the user data form  */}

        <form className="flex flex-col gap-3">
          <label htmlFor="" className="flex flex-col text-left">
            Location:
            <input
              type="text"
              placeholder="eg:Kathmandu, Butwal"
              className="border-2 border-black rounded-xl p-2"
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Employment Status:
            <input
              type="text"
              placeholder="eg:Unemployed, student"
              className="border-2 border-black rounded-xl p-2"
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Relationship Status:
            <select name="relation" id="">
              <option value="single">Single</option>
            </select>
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Date of Birth:
            <input
              type="date"
              placeholder="eg:Broke, single, married"
              className="border-2 border-black rounded-xl p-2"
            />
          </label>
        </form>
      </div>
    </>
  );
}
