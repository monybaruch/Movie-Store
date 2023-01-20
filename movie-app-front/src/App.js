import "./App.css";
import Footer from "./component/Footer";
import Home from "./component/Home";
import About from "./component/About";
import SignUp from "./component/SignUp";
import Navbar from "./component/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyBackgroundImage from "./resources/filmBackground.jpg";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Logout from "./component/Logout";

function App() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${MyBackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />

      <header>
        <Navbar />
      </header>

      <main className="container flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="sign-up"
            element={<SignUp redirect="/login"></SignUp>}
          ></Route>
          <Route path="login" element={<Login redirect="/" />} />
          <Route path="logout" element={<Logout redirect="/" />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
