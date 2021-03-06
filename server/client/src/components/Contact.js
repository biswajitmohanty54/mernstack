import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
  const userContact = async () => {
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
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  //store the data
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  //send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("Message not send");
    } else {
      alert("Message send");
      setUserData({ ...userData, message: "" });
    }
  };

  const contactList = [
    {
      id: 0,
      icon: <i className="zmdi zmdi-smartphone-iphone zmdi-hc-2x text-info"></i>,
      ob1: "Phone",
      ob2: "+91 9658834473",
    },
    {
      id: 1,
      icon: <i className="zmdi zmdi-smartphone-iphone zmdi-hc-2x text-info"></i>,
      ob1: "Email",
      ob2: "biswajitmohanty54@gmail.com",
    },
    {
      id: 2,
      icon: <i className="zmdi zmdi-smartphone-iphone zmdi-hc-2x text-info"></i>,
      ob1: "Address",
      ob2: "Brahmagiri, Puri",
    },
  ];

  const clArray = contactList.map((contactCard, i) => {
    return (
      <>
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 shadow-sm rounded mb-2">
            <div>{contactCard.icon}</div>
            <div className="ms-3">
              <h5 className="mb-1">{contactCard.ob1}</h5>
              <h6>{contactCard.ob2}</h6>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <section className="contact-info">
        <div className="container">
          <div className="row my-5">{clArray}</div>
          <div className="cardPack shadow-sm rounded">
            <h2 className="mb-3">Get in touch</h2>
            <form method="POST">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <input type="text" name="name" id="name" className="form-control" value={userData.name} onChange={handleInputs} placeholder="Your Name" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <input type="email" name="email" id="email" className="form-control" value={userData.email} onChange={handleInputs} placeholder="Your email" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <input type="number" name="phone" id="number" className="form-control" value={userData.phone} onChange={handleInputs} placeholder="Your Phone Number" />
                  </div>
                </div>
                <div className="col-md-12">
                  <textarea name="message" id="" cols="30" className="form-control" rows="5" value={userData.message} onChange={handleInputs} placeholder="Message"></textarea>
                </div>
                <div className="col-md-12 mt-5">
                  <button type="submit" className="btn btn-primary" onClick={contactForm}>
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
