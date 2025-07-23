import React, { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import Noti from "./Noti";
import { BACKENDURL } from "../../global/config";

function SNavBar() {
  const [isOpen, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");

  const [noti, setNoti] = useState(false);
  const [mode, setMode] = useState({});

  const navigate = useNavigate();
  // function to change to light mode
  let themeState = false;
  function light() {
    themeState = false;
    document.documentElement.classList.remove("dark");
    localStorage.setItem("themeState", "false");
  }

  function dark() {
    themeState = false;
    document.documentElement.classList.add("dark");
    localStorage.setItem("themeState", "true");
  }

  // function for the signout feature
  function signOut() {
    navigate("/", { replace: true });
    localStorage.removeItem("token");
  }

  // function to get the user data such as id usernamd and userprofile form backend
  async function getData() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKENDURL}/getProfile`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const msg = await res.json();
    if (res.ok) {
      console.log(msg);
      console.log("Data fetched successfully");
      console.log(msg.data);
      setUserData(msg.data);
    } else {
      console.log("Error in data fetching");
    }
  }

  // function to check if user has valid jwt token if not then redirect them to the home page

  async function check() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKENDURL}/verify`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    console.log("This check function of social page worked");
    if (!res.ok) {
      navigate("/", { replace: true });
    }
  }

  // function to get the search term and search

  async function Search() {
    const res = await fetch("");
  }

  useEffect(() => {
    check();
    const themeState = localStorage.getItem("themeState");
    if (themeState === "true") {
      dark();
    }
    console.log("Nav bar mounted");
    getData();
  }, []);

  return (
    <>
      {/* main container */}
      <div className="bg-white w-full flex px-4 py-6 justify-between items-center md:px-10 sticky top-0 overflow-x-hidden shadow-2xs z-10 dark:bg-gray-700 dark:text-white">
        {/* logo */}
        <div>
          <Link to="feed">
            <h1 className="font-black text-xl md:text-3xl text-black dark:text-white font-serif cursor-pointer">
              Echo-Chamber.
            </h1>
          </Link>
        </div>

        {/* search bar */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-2 flex gap-2">
          <img src="/search.svg" alt="" className="invert dark:invert-0" />
          <input
            type="text"
            className="outline-none md:w-50 w-20 lg:w-90 bg-transparent text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-300"
            placeholder="Search for vibes and peace"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* profile and notification */}
        <div className="flex items-center gap-3 md:gap-10">
          <img
            onClick={() => {
              setNoti((pre) => !pre);
            }}
            src="/notification.png"
            alt=""
            className="w-6 cursor-pointer  hover:scale-105 active:scale-95 transition-all  "
            title="Notifications"
          />

          <div
            onClick={() => {
              setOpen((pre) => !pre);
              setNoti(false);
            }}
            className="rounded-full overflow-hidden w-10 h-10  hover:scale-105 active:scale-95 transition-all"
            title="Account"
          >
            <img
              src={userData?.profile}
              alt=""
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* The notification dropdown */}
      {noti && <Noti />}
      {/* profile dropdown box */}
      {noti == false && (
        <div className="bg-white dark:bg-gray-600 dark:text-white w-60 fixed right-6 h-80 top-25 shadow-2xl rounded-xl flex p-6 hidden md:block z-10">
          {/* image + username */}
          <div className="flex gap-3">
            <div
              className="rounded-full overflow-hidden w-12 h-12"
              title="Account"
            >
              <img
                src={userData?.profile}
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
          <Link to={`/SocialPage/profile/${userData?.id}`}>
            <button className="mt-2 bg-blue-200 dark:bg-blue-800 text-black dark:text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition">
              View profile
            </button>
          </Link>

          {/* menu options */}
          <div className="flex flex-col mt-4 gap-3">
            <div className="flex flex-row gap-2 group cursor-pointer">
              <img src="/settings.png" alt="" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Settings and privacy
              </p>
            </div>
            <Link to="/support">
              <div className="flex flex-row gap-2 group cursor-pointer">
                <img src="/support.png" alt="" className="w-5" />
                <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                  Support and Help
                </p>
              </div>
            </Link>
          </div>

          {/* signout section */}
          <div className="border-b border-gray-400 dark:border-gray-600 w-full mt-4"></div>
          <div
            className="flex flex-row gap-2 group mt-3 cursor-pointer"
            onClick={signOut}
          >
            <img src="/signout.png" alt="" className="w-5" />
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
              className={`w-8   rounded cursor-pointer ${
                mode[1] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                dark();
                setMode({ 1: true });
                console.log(mode);
              }}
            />
            <img
              src="/light.png"
              alt="Light"
              className={`w-8  dark:hover:bg-gray-600 rounded cursor-pointer ${
                mode[2] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                light();
                setMode({ 2: true });
                console.log(mode);
              }}
            />
          </div>
        </div>
      )}

      {/* for the mobiel version */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-600 dark:text-white max-w-xs w-full fixed right-4 top-24 shadow-2xl rounded-xl p-4 flex flex-col gap-4 sm:w-60 sm:p-6 sm:right-6 sm:top-25 md:hidden z-10">
          {/* image + username */}
          <div className="flex gap-3 items-center">
            <div
              className="rounded-full overflow-hidden w-12 h-12"
              title="Account"
            >
              <img
                src={userData?.profile}
                alt="User Avatar"
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{userData?.username}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                A Peace lover
              </p>
            </div>
          </div>

          {/* profile button */}
          <Link to={`/SocialPage/profile/${userData.id}`} className="w-full">
            <button
              onClick={() => {
                setOpen((pre) => !pre);
              }}
              className="bg-blue-200 dark:bg-blue-800 text-black dark:text-white p-2 rounded w-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              View profile
            </button>
          </Link>

          {/* menu options */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <img src="/settings.png" alt="Settings" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Settings and privacy
              </p>
            </div>

            <div className="flex items-center gap-2 group cursor-pointer">
              <img src="/support.png" alt="Support" className="w-5" />
              <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
                Support and Help
              </p>
            </div>
          </div>

          {/* signout section */}
          <div className="border-b border-gray-400 dark:border-gray-600 w-full" />
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={signOut}
          >
            <img src="/signout.png" alt="Sign out" className="w-5" />
            <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400">
              Sign out
            </p>
          </div>
          <div className="border-b border-gray-400 dark:border-gray-600 w-full" />

          {/* dark mode toggle */}
          <div className="flex justify-around items-center mt-2">
            <p className="text-base">Mode:</p>
            <img
              src="/night-mode.png"
              alt="Dark"
              className={`w-8   rounded cursor-pointer ${
                mode[1] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                dark();
                setMode({ 1: true });
                console.log(mode);
              }}
            />
            <img
              src="/light.png"
              alt="Light"
              className={`w-8  dark:hover:bg-gray-600 rounded cursor-pointer ${
                mode[2] ? "bg-blue-500 rounded-xl p-2" : ""
              }`}
              onClick={() => {
                light();
                setMode({ 2: true });
                console.log(mode);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SNavBar;
