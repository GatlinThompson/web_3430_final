// *** Create a SignInForm component ***
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "admin@school.edu",
  password: "asdf",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password Required"),
});

export default function SignInForm() {
  const navigate = useNavigate();
  const { setAuthenticated, setLoggedInUser } = useContext(AppContext);

  const onSubmit = (values) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        if (resp.token) {
          toast.success("Login successful!");
          setLoggedInUser(resp);
          setAuthenticated(resp.token);
          navigate("/dashboard");
        } else {
          toast.error("You DID NOT authenticate");
        }
      })
      .catch((err) => {
        alert("Error....", err);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="react-stuff form">
      <form onSubmit={formik.handleSubmit} className="form-style">
        <div>
          <label htmlFor="username">Username &nbsp;</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password &nbsp;</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="reset" onClick={() => formik.resetForm()}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
