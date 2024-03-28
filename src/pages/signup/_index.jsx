import { useEffect, useState } from "react";
import { Form ,NavLink,useActionData, useNavigate} from "react-router-dom";


export const signupAction = async ({ request }) => {
  if (request.method !== "POST") return {};


  const formData = await request.formData();

  const formDataObject = Object.fromEntries(formData.entries());
  let response;
  if (formDataObject.confirmPassword !== formDataObject.password) {
    return { error: "Passwords do not match" };
  }

  try {
    response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        first_name: formDataObject.first_name,
        last_name: formDataObject.lastName,
        username: formDataObject.username,
        email: formDataObject.email,
        password: formDataObject.password,
        is_staff: false,
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




const Signup = () => {
  const response=useActionData()
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();


  console.log(response)

  useEffect(() => {
    if (response?.id) {

      navigate("/login");
    } 
    if (response?.error) {
      setLoginError(response?.error);
    }
  }, [response]);


  return (
    <div className="container">

<div className="right">
<div className="signup-form ">
    <h2 className="signup-form__title">Sign Up</h2>
    <Form className="signup-form__form" method="post" action="/signup">
     <div className="signup-form__full-name">

     <div className="signup-form__field inp">
        {/* <label className="signup-form__label">First Name:</label> */}
        <input
          className="signup-form__input "
          type="text"
          placeholder="firstName"
          name="first name"
          required
        />
      </div>
      <div className="signup-form__field inp">
        {/* <label className="signup-form__label">Last Name:</label> */}
        <input
          className="signup-form__input "
          type="text"
          placeholder="Last Name"
          name="lastName"
          required
        />
      </div>



     </div>
      <div className="signup-form__field">
        {/* <label className="signup-form__label">Username:</label> */}
        <input
          className="signup-form__input"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <div className="signup-form__field">
        {/* <label className="signup-form__label">Email:</label> */}
        <input
          className="signup-form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="signup-form__field">
        {/* <label className="signup-form__label">Password:</label> */}
        <input
          className="signup-form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="signup-form__field">
        {/* <label className="signup-form__label">Confirm Password:</label> */}
        <input
          className="signup-form__input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
        />
      </div>
      {loginError&&<p className="error">{loginError}</p>}
      <button className="signup-form__submit" type="submit">Sign Up</button>
      <p>
      Don't have an account? <NavLink to={'/login'} className={'login'}>Login</NavLink>
      </p>
    </Form>
  </div>

  </div>



    </div>

  )
}

export default Signup

