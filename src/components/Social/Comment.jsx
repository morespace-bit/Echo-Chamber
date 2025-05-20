import { useEffect, useState } from "react";
import { db, auth } from "../Firebase/config";
import {
  collection,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default function Comment({ userData, postId, open, close }) {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);

  // getting the comments form the firebase database
  const getComment = async () => {
    const pcommentRef = collection(db, "Post", postId, "comment");
    const q = query(pcommentRef, orderBy("Timestamp", "desc"));
    const res = await getDocs(q);
    const data = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComment(data);
  };

  // posting the data to the firebase databse
  const PostComment = async () => {
    if (content.trim().length === 0) {
      alert("Please enter a comment");
      return;
    }
    const commentRef = collection(doc(db, "Post", postId), "comment");
    await addDoc(commentRef, {
      username: userData.username,
      Photo: userData.Photo,
      content: content,
      Timestamp: serverTimestamp(),
    });
    getComment();
    setContent((pre) => {
      return (pre = "");
    });
  };

  useEffect(() => {
    getComment();
  }, [postId]);

  return (
    <>
      {/* main container for comment */}
      <div className="flex w-full  dark:bg-gray-800 mt-3 flex-col p-3 rounded-xl dark:shadow-xl">
        {/* now the add a comment section */}
        <div className="flex items-center gap-3">
          {/* div for making the profile pic circle */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
            <img
              src={userData?.Photo}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          {/* the comment input type div */}
          <div className="flex items-center flex-1 min-w-70 max-w-170 md:w-120 bg-gray-200 dark:bg-gray-700 rounded-xl p-2 cursor-pointer">
            <input
              type="text"
              className="w-full outline-none px-2 bg-transparent text-black dark:text-white cursor-pointer"
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              className="p-2 bg-blue-300 dark:bg-blue-600 px-4 rounded-2xl hover:bg-blue-500 dark:hover:bg-blue-700 hover:scale-105 active:scale-95 duration-75 ease-in cursor-pointer"
              onClick={PostComment}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* the comments of all the people mapped */}
      {open[postId] && (
        <div className="absolute bg-white dark:bg-gray-800 shadow-2xl shadow-blue-200 w-90 rounded-xl h-115 overflow-y-auto md:w-150">
          <div className="mt-3 justify-center items-center flex gap-5 relative">
            <h2 className="text-xl font-semibold dark:text-white">Comments</h2>
            <img
              src={"/close.png"}
              alt=""
              className="h-8 absolute right-4 cursor-pointer hover:scale-120 active:scale-95 duration-75 ease-in"
              onClick={() => {
                close(postId);
              }}
            />
          </div>

          {comment.length === 0 && (
            <div className="mt-20 text-center">
              <p className="text-2xl dark:text-white">No comments</p>
            </div>
          )}

          {comment.map((c) => {
            return (
              <div className="flex gap-3 mt-2 p-2" key={c.id}>
                {/* image of the person */}
                <div className="rounded-full overflow-hidden object-cover w-8 h-8 ">
                  <img
                    src={c.Photo}
                    alt="user-profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* the content and username */}
                <div className="bg-gray-300 dark:bg-gray-600 flex flex-col p-3 rounded-2xl">
                  <h2 className="text-black dark:text-white text-xl font-semibold text-left ">
                    {c.username}
                  </h2>
                  <p className="text-black dark:text-white">{c.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
