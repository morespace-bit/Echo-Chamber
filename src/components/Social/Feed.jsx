import { useState, useEffect } from "react";
import { auth, db } from "../Firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CreateFeed from "./Creating/CreateFeed";
import Comment from "./Creating/Comment";
import SNavBar from "./SNavBar";
import CreateFeedText from "./Creating/CreateFeedText";
export default function Feed() {
  const [userData, setUserData] = useState(null);
  const [u_id, setUId] = useState(""); // Use state for UID
  const [imageUpload, setImageUpload] = useState(false);
  const [textUpload, setTextUpload] = useState(false);
  const [post, setPost] = useState(null);
  const [likedPost, setLikedPost] = useState({});
  const [commentPost, setCommentPost] = useState({});
  const [likesOfPost, setLikesOfPost] = useState({});

  // function to set liked and unlike ui also to update the firebase store for no of likes
  const like = async (id) => {
    setLikedPost((pre) => {
      const updated = {
        ...pre,
        [id]: !pre[id],
      };
      localStorage.setItem("likedPost", JSON.stringify(updated));
      return updated;
    });

    setLikesOfPost((pre) => {});
  };

  // function to like the post and send it to firebase

  async function likeUnlike(id) {
    const postRef = doc(db, "Post", id);

    if (!likedPost[id]) {
      // like
      await updateDoc(postRef, {
        Likes: increment(1),
        likedBy: arrayUnion(u_id),
      });
    } else {
      // unlike
      await updateDoc(postRef, {
        Likes: increment(-1),
        likedBy: arrayRemove(u_id),
      });
    }
    getLikes();

    console.log(id);
  }

  const comment = (id) => {
    setCommentPost((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  };

  // geting user profile form firebase
  async function getUserProfile() {
    if (!u_id) return;
    const profileRef = doc(db, "User", u_id);
    const res = await getDoc(profileRef);
    if (res.exists()) {
      setUserData(res.data());
    } else {
      console.log("No profile found");
    }
  }

  // getting the likes form the firebase data

  async function getLikes() {
    let postRef = collection(db, "Post");
    let q = query(postRef, orderBy("CreatedAt", "desc"));
    let res = await getDocs(q);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPost(data);
    console.log(data[0].id);

    // loop to set the likes the likesOfPost object
    let likesMap = {};
    for (let i = 0; i < data.length; i++) {
      likesMap[data[i].id] = data[i].Likes;
    }

    setLikesOfPost(likesMap);
    console.log(likesMap);
  }

  // getting user post form the firebase firestore
  async function getPost() {
    let postRef = collection(db, "Post");
    let q = query(postRef, orderBy("CreatedAt", "desc"));
    let res = await getDocs(q);
    let data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPost(data);
    console.log(data[0].id);

    // loop to set the likes the likesOfPost object
    let likesMap = {};
    for (let i = 0; i < data.length; i++) {
      likesMap[data[i].id] = data[i].Likes;
    }

    setLikesOfPost(likesMap);
    console.log(likesMap);
  }

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

  useEffect(() => {
    getUserProfile();
    getPost();
    const item = localStorage.getItem("likedPost");
    const stored = item ? JSON.parse(item) : {};
    setLikedPost(stored);
  }, [u_id]);

  return (
    <div className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <SNavBar userData={userData} />
      <div className="flex w-full md:justify-between items-center justify-center flex-9/12 overflow-x-hidden overflow-y-auto">
        {/* Left part */}
        <div className="hidden md:block fixed left-0 top-30 h-full">
          {/* card container */}
          <div className="flex flex-col p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl ml-4 shadow-2xl h-[80%] mb-4">
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/group.png"} alt="" className="h-8" />
              <p>Friends</p>
            </div>

            <div className="flex flex-row items-center gap-2 mb-3 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/history.png"} alt="" className="h-6" />
              <p>Memories</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/vibes.png"} alt="" className="h-6" />
              <p>Vibes</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/peace.png"} alt="" className="h-8" />
              <p>Peace</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/cpu.png"} alt="" className="h-8" />
              <p>Tech News</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/home.png"} alt="" className="h-8" />
              <p>Home Feed</p>
            </div>
          </div>
        </div>

        {/* Center part */}
        <div className="w-full text-center p-6 flex justify-center items-center flex-col overflow-y-auto mx-h-[100%]">
          {/* Create feed and user name part */}
          <div className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-w-150 flex-col gap-4">
            <div className="flex flex-row gap-6">
              <div className="rounded-full overflow-hidden w-10 h-10 ">
                <img
                  src={userData?.Photo}
                  alt=""
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              <input
                type="text"
                className="bg-gray-200 dark:bg-gray-600 rounded-2xl px-5 py-3 w-80 md:w-120 cursor-pointer"
                placeholder={`What's on your mind, ${userData?.username}`}
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              />
            </div>
            <div className="flex flex-row justify-around items-center">
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              >
                <img src={"/image.png"} alt="" className="h-10" />
                <p>Images</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/thought-bubble.png"} alt="" className="h-10" />
                <p>Thoughts</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/activity.png"} alt="" className="h-10" />
                <p>Activity</p>
              </div>
            </div>
          </div>

          {/* the actual post starts from here */}
          {post?.map((i) => (
            <div
              key={i?.id}
              className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-h-200 max-w-150 flex-col"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                  <img
                    src={i.Profile}
                    alt="profile-icon"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="tracking-widest">{i?.Username}</p>
                  <p className="text-xs">4 hours ago</p>
                </div>
              </div>
              <div className="flex justify-start items-start mb-4">
                <p className="text-left">{i?.Content}</p>
              </div>
              <div className="overflow-hidden object-center rounded-xl">
                <img src={i?.Url} alt="" className="rounded-xl w-full " />
              </div>
              <div className="border-b-2 border-gray-400 dark:border-gray-600 flex justify-center items-center mt-2"></div>
              <div className="flex flex-row px-2 py-2 justify-around">
                <div
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  onClick={() => {
                    like(i.id);
                    likeUnlike(i.id);
                  }}
                >
                  <img
                    src={likedPost[i.id] ? "/red-love.png" : "/love.png"}
                    alt=""
                    className="h-6 hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
                  />
                  <p>Likes {likesOfPost?.[i.id]}</p>
                </div>
                <div
                  className="flex flex-row gap-2 items-center cursor-pointer hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
                  onClick={() => {
                    comment(i.id);
                  }}
                >
                  <img src={"/comments.png"} alt="" className="h-6 " />
                  <p>Comments</p>
                </div>
              </div>
              <Comment
                userData={userData}
                postId={i.id}
                open={commentPost}
                close={comment}
              />
            </div>
          ))}
        </div>

        {imageUpload == true && (
          <CreateFeed
            userData={userData}
            setImageUpload={setImageUpload}
            u_id={u_id}
            getPost={getPost}
          />
        )}

        {textUpload && (
          <CreateFeedText
            userData={userData}
            setTextUpload={setTextUpload}
            u_id={u_id}
            getPost={getPost}
          />
        )}
      </div>
    </div>
  );
}
