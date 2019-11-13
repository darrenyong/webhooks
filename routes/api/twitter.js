const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

router.get("/test", (_, res) => {
  res.json({ msg: "This is the twitter test" });
})

module.exports = router;