export default function EditProfile({ setEditProfile }) {
  return (
    <>
      {/* the main container */}
      <div className="absolute z-10 top-40 bg-white w-90 p-4 rounded-xl shadow-2xl shadow-blue-400 ">
        {/* the user data form  */}

        <form className="flex flex-col gap-3 relative p-2">
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
            <select
              name="relation"
              id=""
              className="border-2 border-black rounded-xl p-2"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="inrelationshipt">In relationship</option>
              <option value="broke">Broke</option>
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

          <label htmlFor="" className="flex flex-col text-left">
            Education:
            <input
              type="text"
              placeholder="eg:Pokhara University, TU"
              className="border-2 border-black rounded-xl p-2"
            />
          </label>

          <label htmlFor="" className="flex flex-col text-left">
            Bio:
            <textarea
              name=""
              id=""
              className="outline-none border-2 border-black rounded-xl p-2"
            ></textarea>
          </label>

          {/* the close button */}
          <img
            src="/close.png"
            alt=""
            className="w-8 h-8 absolute right-0 top-0 hover:scale-105 cursor-pointer active:scale-95"
            onClick={() => {
              setEditProfile((pre) => !pre);
            }}
          />

          <button
            className="bg-black rounded-xl p-2 text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Save and Continue
          </button>
        </form>
      </div>
    </>
  );
}
