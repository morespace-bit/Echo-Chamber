import React, { useEffect, useRef, useState } from "react";
import { BACKENDURL } from "../../../global/config";

function CreateFeedText({ userData, setTextUpload, getPost }) {
  const [content, setContent] = useState({
    content: "",
  });
  const [loding, setLoding] = useState(false);

  // useref to auto fucos on the component load

  const inputRef = useRef(null);

  // function to upload to cloudniary not needed here as it is only for text thing

  // function to upload to backend only text

  async function uploadText() {
    setLoding(true);
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKENDURL}/createPost`, {
      method: "POST",

      headers: {
        "content-type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify(content),
    });
    const msg = res.json();
    setLoding(false);
    setTextUpload(false);
    getPost();
    if (!res.ok) {
      console.log(msg.message);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="fixed top-30 w-full flex justify-center items-center z-50">
      {/* Card container */}
      <div className="rounded-xl shadow-2xl bg-white dark:bg-zinc-900 dark:text-white flex justify-center items-center flex-col w-110 md:w-140 relative p-4">
        <h1 className="font-semibold text-2xl font-sans">Create post</h1>

        <img
          onClick={() => setTextUpload((pre) => !pre)}
          src={"/close.png"}
          alt="Close"
          className="h-8 absolute right-3 top-2 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer hover:bg-red-300 dark:hover:bg-red-500 transition duration-75 ease-in"
        />

        {/* Divider */}
        <div className="flex border-b-2 border-gray-200 dark:border-gray-600 w-full mt-2 mb-2"></div>

        {/* Text input */}
        <div className="flex flex-row justify-start w-full">
          <input
            ref={inputRef}
            onChange={(e) =>
              setContent((pre) => {
                return { ...pre, content: e.target.value };
              })
            }
            type="text"
            placeholder={`What's on your mind, ${userData?.username}`}
            className="w-full px-3 outline-none placeholder:text-xl bg-transparent text-black dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* File Upload */}

        {/* Post Button */}
        <div className="w-full flex items-center justify-center mt-4">
          {loding ? (
            <button className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105">
              Image is being processed
            </button>
          ) : (
            <button
              className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105"
              onClick={uploadText}
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateFeedText;
