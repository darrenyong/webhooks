const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;

const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")

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

app.get("/", (_, res) => {
  res.send("Hello World!")
})

app.use("/api/users", users);
app.use("/api/tweets", tweets);