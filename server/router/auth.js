const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello world from the server router.js");
});

//Using Promises
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword ){
//         return res.status(422).json({ error: "Please fill the filed" });
//     }

//     User.findOne({ email:email })
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({ error: "Email already Exist" });
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message: "User registered succesfully"});
//         }).catch((err) => res.status(500).json({error: "Failed to registered"}));
//     }).catch(err => {console.log(err);});

// });

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the filed" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();
    }

    // console.log(`&{user} user registerd successfully`);
    // console.log(userRegesiter);

    res.status(201).json({ message: "User registered succesfully" });

    // .then((userExist) => {
    //     if(userExist){
    //         return res.status(422).json({ error: "Email already Exist" });
    //     }

    //     const user = new User({name, email, phone, work, password, cpassword});

    //     user.save().then(()=>{
    //         res.status(201).json({message: "User registered succesfully"});
    //     }).catch((err) => res.status(500).json({error: "Failed to registered"}));
    // })
  } catch (err) {
    console.log(err);
  }
});

// login route

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message: "awesome"});

  let token;

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.json({ message: "User sign in succesfully" });
      }
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  console.log(`Hello my about`);
  res.send(req.rootUser);
});

//Get user data for contact and home
router.get("/getdata", authenticate, (req, res) => {
  console.log(`Hello my Getdata`);
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("Error in contact page");
      return res.json({ error: "plzz filled the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(name, email, phone, message);
      await userContact.save();
      res.status(201).json({ message: "User contact succesfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//Logout page
router.get("/logout", (req, res) => {
  console.log(`Hello my logout`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
