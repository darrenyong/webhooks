const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const keys = require("./config/keys")

const intercom = require("./routes/api/intercom")
const twitter = require("./routes/api/twitter")

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

app.use("/intercom", intercom);
app.use("/twitter", twitter);