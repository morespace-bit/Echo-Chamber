import { useEffect, useState } from "react";
import SNavBar from "./SNavBar";
import { auth, db } from "../Firebase/config";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";
import About from "./About";
import ProfileFeed from "./ProfileFeed";

export default function Profile() {
  const [u_id, setUId] = useState("");
  const [userData, setUserData] = useState({});
  const [button, setButton] = useState({
    1: true,
  });

  // function to set the user profile details

  async function Upload() {
    if (!url || !username) {
      alert("Please upload an image and enter a username before submitting.");
      return;
    }

    // Save user data to Firestore using setDoc
    const userRef = doc(db, "User", u_id);
    await setDoc(userRef, {
      username: username,
      Photo: url,
    });

    navigate("/welcome", { replace: true });
  }

  // function to toogel for the button such as about post and so on

  function toogle(id) {
    setButton((pre) => {
      return {
        [id]: true,
      };
    });
    console.log(button);
  }

  // function to get user profile

  async function getUserProfile() {
    if (!u_id) return;
    const profileRef = doc(db, "User", u_id);
    const res = await getDoc(profileRef);
    setUserData(res.data());
    console.log(res.data());
  }
  // the use effect function to get the user data
  useEffect(() => {
    // Handle user authentication state change

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User UID:", user.uid);
        setUId(user.uid); // Set the UID in state
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  // the useeffect funtion to load data on the first mounting of the data
  useEffect(() => {
    getUserProfile();
  }, [u_id]);
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

      {/* the body part of the profile */}
      <div className="h-full bg-gray-300 flex   overflow-x-hidden flex-col items-center overflow-y-hidden">
        {/* the main container */}
        {/* the card container */}
        <div className="flex bg-white px-2  h-105 mt-5 rounded-2xl w-100 flex-col items-center md:w-150">
          {/* the image and person name */}
          {/* main container or the card of the profile */}
          <div className="rounded-full  overflow-hidden w-50 h-50 mt-4">
            <img
              src={userData?.Photo}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold">{userData?.username}</p>
          <button className="mt-1 bg-blue-300 p-2 px-3 rounded-xs flex flex-row gap-2 items-center hover:scale-105 hover:bg-blue-800 cursor-pointer">
            <img src="/edit.png" alt="" className="w-5" />
            Edit profile
          </button>
          {/* the profile info */}
          <div className=" flex gap-4 bg-gray-200  w-full py-5 justify-center items-center rounded-2xl mt-3 px-2">
            {/* for the job */}
            <div className="flex gap-1">
              <img src="/job-seeker.png" alt="" className="w-6" />
              <p>Unemployed</p>
            </div>

            {/* relationship status */}
            <div className="flex gap-1">
              <img src="/heart.png" alt="" className="w-6" />
              <p>Single</p>
            </div>

            {/* location  */}

            <div className="flex gap-1">
              <img src="/location.png" alt="" className="w-6" />
              <p>Kathmandu</p>
            </div>
          </div>
          {/* the divider */}
          <div className="border-1 border-gray-400 w-full mt-3"></div>
          {/* the nav bar for the profile like about post and so on */}
          <div className="flex mt-2 items-center justify-between w-full px-4 font-bold">
            <p
              onClick={() => {
                toogle(1);
              }}
              className={`cursor-pointer ${
                button[1] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Post
            </p>
            <p
              onClick={() => {
                toogle(2);
              }}
              className={`cursor-pointer ${
                button[2] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              About
            </p>
            <p
              onClick={() => {
                toogle(3);
              }}
              className={`cursor-pointer ${
                button[3] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Activity
            </p>
            <p
              onClick={() => {
                toogle(4);
              }}
              className={`cursor-pointer ${
                button[4] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Events
            </p>
          </div>
        </div>
        {button[2] && <About />}
        {button[1] && <ProfileFeed />}
      </div>
    </>
  );
}
