import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import loginpic from "../images/login.svg";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
      console.log("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      console.log("Login Successful");

      history.push("/");
    }
  };
  return (
    <>
      <section className="signin">
        <div className="container mt-5">
          <div className="p-5 m-5 shadow-sm rounded">
            <h2 className="mb-4">Login</h2>
            <div className="row align-items-center">
              <div className="col-6">
                <figure>
                  <img src={loginpic} alt="Login pic" />
                </figure>
                Not a member | &nbsp;
                <NavLink to="/signup" className="text-primary text-decoration-none">
                  signup now
                </NavLink>
              </div>
              <div className="col-6">
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group mb-3">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
                  </div>
                  <div className="mt-4">
                    <input type="submit" name="login" id="login" className="btn btn-primary" value="login" onClick={loginUser} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
