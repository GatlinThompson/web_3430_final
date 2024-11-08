import { Outlet, NavLink } from "react-router-dom";
import Nav from "./Nav";

//db seed
const dbSeed = () => {
  fetch("/api/createAdmin", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      console.log(resp);
      alert(resp.message);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Copyright 2024</p>
        <button onClick={dbSeed}>Reseed the DB with sample accounts.</button>
      </footer>
    </>
  );
}
