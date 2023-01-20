import Logo from "../resources/blockbuster2.png";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
function Navbar() {
  const { user } = useAuth;
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Bootstrap" width="80" height="80"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about">
                About
              </NavLink>
            </li>
            {user?.vipMember && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-movies">
                  My Movies
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="signout"
                >
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Vip Member Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
