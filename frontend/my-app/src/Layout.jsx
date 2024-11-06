import { Outlet, NavLink } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Copyright 2024</p>
      </footer>
    </>
  );
}
