import React from "react";
import { db, auth } from "../Firebase/config";

function ProfileData() {
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

  return (
    <>
      <h1>This is where the user will enter data</h1>
    </>
  );
}

export default ProfileData;
