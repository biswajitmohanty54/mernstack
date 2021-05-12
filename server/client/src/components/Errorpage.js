import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () => {
  return (
    <>
      <section className="notfound" id="notfound">
        <div className="d-flex justify-content-center align-items-center flex-column vh-100 ">
          <h1>404</h1>
          <h3>We are sorry page not found</h3>
          <NavLink to="/" className="btn btn-primary text-decoration-none mt-2">
            Back to Homepage
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Errorpage;
