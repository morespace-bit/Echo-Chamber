import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Forlogin from "./components/Animation/Forlogin.jsx";
import UserData from "./components/Social/UserData.jsx";
import Feed from "./components/Social/Feed.jsx";
import Profile from "./components/Social/Profile.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Support from "./components/Home/Support.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/userdata" element={<UserData />} />
      <Route path="/welcome" element={<Forlogin />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="/support" element={<Support />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
