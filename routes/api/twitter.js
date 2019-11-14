const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const security = require("../../helpers/security")

const twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY || keys.twitterConsumerKey;
const twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET || keys.twitterConsumerSecret;
const twitterAccessKey = process.env.TWITTER_ACCESS_KEY || keys.twitterAccessKey;
const twitterAccessSecret = process.env.TWITTER_ACCESS_SECRET || keys.twitterAccessSecret;

router.get("/test", (_, res) => {
  res.json({ msg: "This is the twitter test" });
})

// Set up Challenge-Response Checks - https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/securing-webhooks
router.get("/webhook", (req, res) => {
  var crc_token = req.query.crc_token;

  if (crc_token) {
    var hash = security.get_challenge_response(crc_token, twitterConsumerSecret)

    res.status(200);
    res.send({
      response_token: "sha256=" + hash
    }) 
  } else {
    res.status(400);
    res.send( "Error - CRC Token missing" )
  }
})

router.post("/webhook", (req, res) => {
  return res.json({ });
})

module.exports = router;