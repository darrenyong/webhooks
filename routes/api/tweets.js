const express = require("express");
const router = express.Router();

router.get("/test", (_, res) => {
  res.json({msg: "This is the tweet route"})
})

module.exports = router;