import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../../../global/config";

function ProfileSetup() {
  const [loding, setLoding] = useState(false);
  const [backendloding, setBackendloding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setUser] = useState({
    username: "",
    profile: "",
  });

  const navigate = useNavigate();

  //  function to upload to Cloudinary and get URL function

  async function fileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "file-upload");
    data.append("cloud_name", "dvxidzrno");
    setLoding(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvxidzrno/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploaded = await res.json();
    setUser((pre) => ({ ...pre, profile: uploaded.url }));
    setLoding(false);
  }

  // function to set the profile username and photo to backend

  async function setProfile() {
    setBackendloding(true);
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(user);
    const res = await fetch(`${BACKENDURL}/createProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(user),
    });

    const msg = await res.json();
    if (res.ok) {
      console.log(msg.message);
      setBackendloding(false);
      navigate("/SocialPage/feed", { replace: true });
    } else {
      console.log("Server went brrrr");
    }
  }

  return (
    <div className="bg-rose-50 min-h-screen flex justify-center items-center overflow-x-hidden flex-row">
      <form
        className="bg-white rounded-2xl flex p-20 flex-col gap-4 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          setProfile();
        }}
      >
        <input
          required
          onChange={(e) => {
            setUser((pre) => {
              return {
                ...pre,
                username: e.target.value,
              };
            });
          }}
          type="text"
          placeholder="Enter your username"
          className="bg-rose-300 p-6 rounded-2xl outline-none  md:text-2xl text-xl"
        />
        <div className="flex flex-col gap-2">
          <p className="px-4 mt-4">Upload a profile picture</p>
          <input
            required
            onChange={fileUpload}
            type="file"
            className="bg-cyan-100 cursor-pointer flex p-6 rounded-2xl hover:scale-105 active:scale-95 duration-150 ease-in"
            placeholder="upload a profile picture"
          />
        </div>
        {loding ? (
          <button className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer">
            {" "}
            Image is processing.
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer"
          >
            {backendloding ? "Data is being processed" : "Next"}
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfileSetup;
