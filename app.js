const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");
const https = require("https");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const keys = require("./config/keys")

// const users = require("./routes/api/users");
const intercom = require("./routes/api/intercom")

// Start up Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.json({msg: "Hello World"});
})

// app.use("/api/users", users);
// app.use("/api/tweets", tweets);
app.use("/intercom", intercom);