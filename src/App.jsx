import Footer from "./components/Home/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Page from "./components/Home/SocialPage";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Support from "./components/Home/Support.jsx";
import ProfileSetup from "./components/Social/profile/ProfileSetup.jsx";
import SocialPage from "./components/Social/page/SocialPage.jsx";
import Feed from "./components/Social/Feed.jsx";
import Forlogin from "./components/Animation/Forlogin.jsx";
import Profile from "./components/Social/profile/Profile.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Homepage />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="profileSetup" element={<ProfileSetup />} />
      <Route path="animation" element={<Forlogin />} />
      {/* nested routes for the social media page for the nav bar and the out let parts */}
      <Route path="socialPage" element={<SocialPage />}>
        <Route path="feed" element={<Feed />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
