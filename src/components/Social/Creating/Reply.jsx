import { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import { FaReply } from "react-icons/fa";

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
const Reply = ({ useData, postId, cmtId }) => {
  const [reply, setReply] = useState([]);

  //function to get reply form firebase

  async function getReply() {
    const replyRef = collection(
      doc(collection(doc(db, "Post", postId), "comment"), cmtId),
      "reply"
    );
    const res = await getDocs(replyRef);
    const data = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setReply(data);
    console.log(data);
  }

  useEffect(() => {
    getReply();
  }, []);

  if (reply.length === 0) {
    return (
      <div>
        <p>No replies </p>
      </div>
    );
  }
  return (
    <div>
      {reply.map((c) => {
        return (
          // the main container for the comment and reply
          <div className="flex flex-col relative" key={c.id}>
            {/* // the main container of the comment and reply button */}
            <div className="flex gap-3 mt-2 p-2  " key={c.id}>
              {/* image of the person */}
              <div className="rounded-full overflow-hidden object-cover w-8 h-8 ">
                <img
                  src={c.Photo}
                  alt="user-profile"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* the content and username */}
              <div className="bg-gray-300 dark:bg-gray-600 flex flex-col pt-3 px-3 pb-0 rounded-2xl relative">
                <h2 className="text-black dark:text-white text-xl font-semibold text-left ">
                  {c.username}
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-black dark:text-white">{c.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reply;
