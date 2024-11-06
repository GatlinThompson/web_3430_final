import React from "react";
// *** When the "Logout link is clicked this component should load.  It should remove the cookie
// using the removeCookie function that was passed down in the context. Also look in App.js for the
// way the cookie is deleted in that component.  You can use a similar technique here.
// In addition, using document.location it should redirect the browser to "/"

import { AppContext } from "../App";
import { useContext } from "react";

export default function SignOut() {
  const { removeCookie } = useContext(AppContext);
  console.log("LOGUT CALLED");
  removeCookie("token");

  document.location = "/";
  return;
}
