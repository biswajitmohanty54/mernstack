import React, { useEffect, useState } from "react";
import Biswapic from "../images/Biswajit.png";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="cardPack shadow-sm rounded">
            <form method="GET">
              <div className="row">
                <div className="col-md-4">
                  <figure class="figure">
                    <img src={Biswapic} alt="Biswajit" />
                  </figure>
                </div>
                <div className="col-md-6">
                  <h6>{userData.name}</h6>
                  <h6>{userData.work}</h6>
                  <p>Ranking: 1/10</p>
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        About
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                        Timeline
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <input type="submit" className="btn btn-outline-primary" value="Edit Profile" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <a href="">Youtube</a>
                  <br />
                  <a href="">Facebook</a>
                  <br />
                  <a href="">Instagram</a>
                  <br />
                  <a href="">Linkdin</a>
                  <br />
                  <a href="">Twitter</a>
                  <br />
                  <a href="">Dribble</a>
                </div>
                <div className="col-md-8">
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      <div className="row">
                        <div className="col-md-4">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-8">
                          <p>4564564564564564564</p>
                        </div>
                        <div className="col-md-4">
                          <label>Name</label>
                        </div>
                        <div className="col-md-8">
                          <p>{userData.name}</p>
                        </div>
                        <div className="col-md-4">
                          <label>Email</label>
                        </div>
                        <div className="col-md-8">
                          <p>{userData.email}</p>
                        </div>
                        <div className="col-md-4">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-8">
                          <p>{userData.phone}</p>
                        </div>
                        <div className="col-md-4">
                          <label>Profession</label>
                        </div>
                        <div className="col-md-8">
                          <p>{userData.work}</p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <div className="row">
                        <div className="col-md-4">
                          <label>User IDE</label>
                        </div>
                        <div className="col-md-8">
                          <p>4564564564564564564</p>
                        </div>
                        <div className="col-md-4">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-8">
                          <p>4564564564564564564</p>
                        </div>
                        <div className="col-md-4">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-8">
                          <p>4564564564564564564</p>
                        </div>
                        <div className="col-md-4">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-8">
                          <p>4564564564564564564</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
