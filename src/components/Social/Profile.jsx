import { useEffect, useState } from "react";
import SNavBar from "./SNavBar";
import { auth, db } from "../Firebase/config";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [u_id, setUId] = useState("");
  const [userData, setUserData] = useState({});

  // function to get user profile

  async function getUserProfile() {
    if (!u_id) return;
    const profileRef = doc(db, "User", u_id);
    const res = await getDoc(profileRef);
    setUserData(res.data());
    console.log(res.data());

    console.log(userData);
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
      <SNavBar />
      <div className="h-screen bg-gray-300">
        {/* the main container */}

        <div className="flex bg-white">
          {/* the image and person name */}
          <div className="flex">
            <img src="nepal.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
