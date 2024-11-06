// *** Create a Nav component ***
import { NavLink, Link } from "react-router-dom";
import { AppContext } from "./App";
import { useContext } from "react";
export default function Nav() {
  const { authenticated, loggedInUser } = useContext(AppContext);
  return (
    <header>
      <nav className="nav-bar">
        <ul className="nav">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {authenticated ? (
            <li>
              <span>&nbsp;|&nbsp;</span>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
          ) : null}
        </ul>
        <ul className="nav">
          {authenticated ? (
            <>
              <li>
                <p>
                  <strong>{loggedInUser.username}</strong>
                </p>
              </li>
              <span>&nbsp;|&nbsp;</span>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/">Register</NavLink>
              </li>
              <span>&nbsp;|&nbsp;</span>
              <li>
                <NavLink to="/signin">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
