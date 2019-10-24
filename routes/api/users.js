const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User")

router.get("/test", (_, res) => {
  res.json({msg: "This is the users route"})
})

router.post("/register", (req, res) => {
  User.findOne({email: req.body.email})
      .then(user => {
        // If there is already an e-mail, throw an error else register the user.
        if (user) {
          return res.status(409).json({email: "A user has already registered with this address"});
        } else {
          const newUser = new User({
            handle: req.body.handle,
            email: req.body.email,
            password: req.body.password
          })
        }
      })
})

module.exports = router;