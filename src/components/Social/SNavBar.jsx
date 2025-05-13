import React from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

function SNavBar({ userData }) {
  const navigate = useNavigate();

  // function to change to light mode
  function light() {
    document.documentElement.classList.remove("dark");
  }

  function dark() {
    document.documentElement.classList.add("dark");
  }

  async function signout() {
    await signOut(auth);
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* main container */}
      <div className="bg-white w-full flex px-4 py-6 justify-between items-center md:px-10 sticky top-0 overflow-x-hidden shadow-2xs z-10 dark:bg-gray-700 dark:text-white">
        {/* logo */}
        <div>
          <h1 className="font-black text-xl md:text-3xl text-black dark:text-white font-serif cursor-pointer">
            Echo-Chamber.
          </h1>
        </div>

        {/* search bar */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-2 flex gap-2">
          <img src="/search.svg" alt="" className="invert dark:invert-0" />
          <input
            type="text"
            className="outline-none md:w-50 w-20 lg:w-90 bg-transparent text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-300"
            placeholder="Search for vibes and peace"
          />
        </div>

        {/* profile and notification */}
        <div className="flex items-center gap-3 md:gap-10">
          <img
            src="/notification.png"
            alt=""
            className="w-6 cursor-pointer  "
            title="Notifications"
          />

          <div
            className="rounded-full overflow-hidden w-10 h-10"
            title="Account"
          >
            <img
              src={userData?.Photo}
              alt=""
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* profile dropdown box */}
      <div className="bg-white dark:bg-zinc-900 dark:text-white w-60 fixed right-6 h-80 top-25 shadow-2xl rounded-xl flex p-6 hidden md:block">
        {/* image + username */}
        <div className="flex gap-3">
          <div
            className="rounded-full overflow-hidden w-12 h-12"
            title="Account"
          >
            <img
              src={userData?.Photo}
              alt=""
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-xl font-semibold text-left">
              {userData?.username}
            </p>
            <p className="text-left text-xs text-gray-600 dark:text-gray-400">
              A Peace lover
            </p>
          </div>
        </div>

        {/* profile button */}
        <button className="mt-2 bg-blue-200 dark:bg-blue-800 text-black dark:text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition">
          View profile
        </button>

        {/* menu options */}
        <div className="flex flex-col mt-4 gap-3">
          <div className="flex flex-row gap-2 group cursor-pointer">
            <img
              src="/settings.png"
              alt=""
              className="w-5" // Removed the invert class to make icons visible in both modes
            />
            <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
              Settings and privacy
            </p>
          </div>

          <div className="flex flex-row gap-2 group cursor-pointer">
            <img
              src="/support.png"
              alt=""
              className="w-5" // Removed the invert class to make icons visible in both modes
            />
            <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
              Support and Help
            </p>
          </div>
        </div>

        {/* signout section */}
        <div className="border-b border-gray-400 dark:border-gray-600 w-full mt-4"></div>
        <div
          className="flex flex-row gap-2 group mt-3 cursor-pointer"
          onClick={signout}
        >
          <img
            src="/signout.png"
            alt=""
            className="w-5" // Removed the invert class to make icons visible in both modes
          />
          <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
            Sign out
          </p>
        </div>
        <div className="border-b border-gray-400 dark:border-gray-600 w-full mt-4 mb-4"></div>

        {/* dark mode toggle */}
        <div className="flex flex-row justify-around items-center">
          <p className="text-xl">Mode:</p>
          <img
            src="/night-mode.png"
            alt="Dark"
            className="w-8 hover:bg-gray-400 dark:hover:bg-gray-600 rounded cursor-pointer"
            onClick={dark}
          />
          <img
            src="/light.png"
            alt="Light"
            className="w-8 hover:bg-gray-400 dark:hover:bg-gray-600 rounded cursor-pointer"
            onClick={light}
          />
        </div>
      </div>
    </>
  );
}

export default SNavBar;
