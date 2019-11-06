const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const https = require("https");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const keys = require("./config/keys")

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const intercomKey = keys.intercomKey;

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

app.get("/test", (req, res) => {
  const options = {
    headers: {
      Authorization: `Bearer ${intercomKey}`,
      Accept: "application/json"
    }
  }
  
  https.get("https://api.intercom.io/admins/", options, (response) => {
    var raw = "";

    response.on("data", (chunk) => {
      raw += chunk;
    });

    response.on("end", () => {
      let result = JSON.parse(raw);
      res.json({admins: result.admins});
    })
  });
})