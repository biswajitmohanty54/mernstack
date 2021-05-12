import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import singpic from "../images/register.svg";

const Signup = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("invalid registration");
      console.log("invalid registration");
    } else {
      window.alert("Resgistration Sucessful");
      console.log("Resgistration Sucessful");
      history.push("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="p-5 m-5 shadow-sm rounded">
            <h2 className="mb-4">Sign Up</h2>
            <div className="row">
              <div className="col-6">
                <form className="register-form" id="register-form" method="POST">
                  <div className="form-group mb-3">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input className="form-control" type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your name" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="number" name="phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your phone" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="work">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="text" name="work" id="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Your Profession" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your password" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input className="form-control" type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Your confirm password" />
                  </div>
                  <div className="mt-4">
                    <input type="submit" name="signup" id="signup" className="btn btn-primary" value="register" onClick={PostData} />
                  </div>
                </form>
              </div>

              <div className="col-6">
                <figure>
                  <img src={singpic} alt="Registration pic" />
                </figure>
                <NavLink to="/login" className="text-dark text-decoration-none">
                  I am already register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
