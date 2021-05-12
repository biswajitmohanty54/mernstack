const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const { remove } = require("./model/userSchema");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
dotenv.config({ path: "./config.env" });

require("./db/conn");
//const User = require('./model/userSchema');

app.use(express.json());

// Link the router file to make router easy
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

//Middleware

// const middleware = (req,res, next) => {
//     console.log('Hello my middleware');
//     next();
// }

//middleware();

// app.get('/',(req, res)=>{
//     res.send('Hello world from the server app.js')
// })

// app.get('/about', middleware ,(req, res)=>{
//     res.send('Hello about world from the server end')
// })

// app.get("/contact", (req, res) => {
//   res.send("Hello Contact world from the server end");
// });

app.get("/signin", (req, res) => {
  res.send("Hello Login world from the server end");
});

app.get("/signup", (req, res) => {
  res.send("Hello Register world from the server end");
});
//console.log('Please subscribe my channel')

// setup heroku

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
