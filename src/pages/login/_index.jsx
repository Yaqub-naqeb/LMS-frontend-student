import { useContext, useEffect, useState } from "react";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/auth/context/AuthContext";

export const loginAction = async ({ request }) => {
  if (request.method !== "POST") return {};

  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());

  let response;

  try {
    response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: formDataObject.username,
        password: formDataObject.password,
      }),
    });

    if (response.ok) {
      response = await response.json();
    }
  } catch (err) {
    console.log("we have an error");
  }

  return response;
};

const Login = () => {
  const response = useActionData();
  const navigate = useNavigate();
  const { toggleAuth, isAuthenticated } = useContext(AuthContext);

  const [loginError, setLoginError] = useState();

  useEffect(() => {
    if (response?.id) {
      localStorage.setItem("token", response?.refresh);
      localStorage.setItem("access", response?.access);
      localStorage.setItem("userId", response?.id);
      localStorage.setItem("username", response?.username);

      toggleAuth();
      navigate("/");
    } else {
      setLoginError("This user does not Exist");
    }
    if (response?.error) {
      setLoginError(response?.error);
    }
  }, [response]);

  const x = localStorage.getItem("token");
  console.log(x, isAuthenticated);

  return (
    <div className="container">
      <div className="right">
        <div className="signup-form ">
          <h2 className="signup-form__title">Login Form</h2>
          <Form className="signup-form__form" method="post" action="/login">
            <div className="signup-form__field">
              <label className="signup-form__label">Username:</label>
              <input
                className="signup-form__input"
                type="username"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="signup-form__field">
              <label className="signup-form__label">Password:</label>
              <input
                className="signup-form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <button className="signup-form__submit" type="submit">
              Login
            </button>

            <p>
              Already have an account?{" "}
              <NavLink to={"/signup"} className={"login"}>
                Sign Up
              </NavLink>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
