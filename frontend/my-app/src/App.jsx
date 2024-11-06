import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomePage from "./HomePage.jsx";
import Nav from "./Nav.jsx";
import SignInForm from "./Auth/SignInForm.jsx";
import Layout from "./Layout.jsx";
import SignOut from "./Auth/SignOut.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashCards from "./DashCards.jsx";

export const AppContext = createContext();

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // authenticated helps to determine what elements like "Log Out" or "Dashboard" to show in Nav.js
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined);
  // this contains the logged in user's profile info (like firstname, lastname and their roles/role names)
  let [loggedInUser, setLoggedInUser] = useState([]);
  // users is the list of all users in the DB
  let [users, setUsers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        loggedInUser,
        setLoggedInUser,
        setCookie,
        removeCookie,
        users,
        setUsers,
      }}
    >
      <div className="react-stuff">
        <Router>
          <Routes>
            {/* Add routes to Nav, SignInForm and DashCards components here.  ***
             */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="nav" element={<Nav />} />
              <Route path="dashboard" element={<DashCards />} />
              <Route path="signin" element={<SignInForm />} />
              <Route path="logout" element={<SignOut />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </AppContext.Provider>
  );
}
