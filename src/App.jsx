import Footer from "./components/Home/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
