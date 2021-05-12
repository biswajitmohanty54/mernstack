import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");

  const [show, setshow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setshow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <section className="home-page">
        <div className="d-flex justify-content-center align-items-center flex-column vh-100 ">
          <h6 className="text-primary mb-3">Welocme</h6>
          <h1>{userName}</h1>
          <h2>{show ? "Happy to see you back" : "We are the MERN Developer"}</h2>
        </div>
      </section>
    </>
  );
};

export default Home;
