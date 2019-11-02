const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const darren = require("./routes/api/darren");

// Start up Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Connect to MongoDB
mongoose
        .connect((db), {useNewUrlParser: true})
        .then(() => console.log("Connected to MongoDB Successfully"))
        .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
  console.log("This is the request");
  console.log(req.body);
  // console.log("This is the response");
  // console.log(res);
  res.json({msg: "Hello World"});
})
app.use("/api/users", users);
app.use("/api/tweets", tweets);