import { Link, replace, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKENDURL } from "../../global/config";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  async function login() {
    setLoding(true);
    const res = await fetch(`${BACKENDURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const msg = await res.json();
    setLoding(false);
    setUser({
      email: "",
      password: "",
    });
    if (res.ok) {
      localStorage.setItem("token", msg.token);
      navigate("/SocialPage/feed", { replace: true });
    } else {
      setErrorMsg(msg.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  }

  return (
    <>
      {/* main container */}
      <div className="bg-rose-50 flex items-center justify-center min-h-screen relative">
        {/* card container */}
        <div className="bg-white flex flex-col relative space-y-10 shadow-2xl rounded-2xl m-6 md:pl-15 md:flex-row md:space-x-6">
          {/* left part container */}
          <div className="flex flex-col space-y-5 md:pt-15">
            <div className="space-y-3">
              <h1 className="text-3xl font-black px-6 font-sans tracking-wide mt-4">
                Log In
              </h1>
              <p className="font-thin px-6 text-gray-600">
                Log in to Exprience the world of non-toxic world. We beieve this
                will be a happy journey.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              {/* Input type or email */}
              <div className="px-6 flex flex-col gap-4">
                <input
                  type="email"
                  required
                  value={user?.email}
                  placeholder="Enter your Email"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  onChange={(e) => {
                    setUser((pre) => {
                      return {
                        ...pre,
                        email: e.target.value,
                      };
                    });
                  }}
                />
                <input
                  type="password"
                  required
                  placeholder="Enter your Password"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  value={user?.password}
                  onChange={(e) => {
                    setUser((pre) => {
                      return {
                        ...pre,
                        password: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              {/* Forget password and Next */}
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-center items-center px-6 md:justify-between">
                <p className="text-blue-800 md:justify-end">Forget Password</p>
                <button
                  type="submit"
                  className="px-4 py-5 
                cursor-pointer
                w-full md:w-50 border border-gray-500 rounded-xs  bg-sky-700 text-white  hover:shadow-2xl shadow-blue-800/50"
                >
                  {loding ? "Processing" : "Next"}
                </button>
              </div>
            </form>
            <div className="mx-6 border-b-2 border-gray-300"></div>

            {/* if not signed in yet */}
            <div className="flex justify-center items-center">
              <Link to="/signup" replace={true}>
                <button className="bg-sky-700 rounded p-4 hover:bg-blue-800 duration-75 ease-in capitalize text-white cursor-pointer">
                  not signed in yet
                </button>
              </Link>
            </div>
          </div>
          <div className=" hidden md:block md:flex justify-center items-center">
            <img src={"/home/login.png"} alt="" className="h-100" />
          </div>
        </div>

        {/* error message container */}
        {errorMsg && (
          <div className="absolute top-15 right-5 bg-red-300 py-2 px-4 rounded-xl md:right-15">
            <p className="font-semibold ">{errorMsg}</p>
          </div>
        )}
      </div>
    </>
  );
}
