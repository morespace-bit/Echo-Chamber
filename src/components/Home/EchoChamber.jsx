export default function EchoChamber() {
  return (
    <>
      {/* main container  */}
      <div className="h-205 w-full flex flex-col">
        {/* the why us section  */}

        <div className="flex flex-col justify-center items-center w-full pt-15 pb-8">
          <p className="font-semibold font-[inter]">WHY US</p>
          <p className="font-[inter]  text-2xl mt-2">
            Why EchoChamber Over Others
          </p>
        </div>
        {/* the cards sections  */}

        <div className="flex flex-col gap-5 justify-center px-7 ">
          {/* the two cards */}

          <div className="flex flex-col justify-center items-center gap-5">
            {/* the card of 1m + */}

            <div className="flex flex-col bg-cyan-100 p-10 rounded-xl  ">
              <p className="font-[inter] font-black text-6xl text-cyan-500 text-left">
                1M+
              </p>
              <p className="mt-5 text-xl font-[inter] text-left">
                People already enjoying EchoChamber
              </p>
            </div>

            <div className="flex flex-col bg-cyan-100 p-10 rounded-xl items-center ">
              <p className=" text-xl font-[inter]">
                Connect with vibes and peace
              </p>
              <img src={"/forpeace.png"} alt="" className="w-13 mt-3" />
            </div>
          </div>

          {/* the last and big card  */}
          <div className="flex flex-col bg-cyan-100 p-10 rounded-xl  ">
            <p className="font-[inter] font-black text-6xl text-cyan-500 text-left">
              VIBES{" "}
            </p>
            <p className="mt-5 text-xl font-[inter] text-left">
              We ensure that you are having fun and vibes match
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
