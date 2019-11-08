const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const https = require("https");

const intercomKey = process.env.intercomKey || keys.intercomKey

router.get("/test", (_, res) => {
  const options = {
    headers: {
      Authorization: `Bearer ${intercomKey}`,
      Accept: "application/json"
    }
  };

  https.get("https://api.intercom.io/admins/", options, response => {
    var raw = "";

    response.on("data", chunk => {
      raw += chunk;
    });

    response
      .on("end", () => {
        let result = JSON.parse(raw);
        res.json({ admins: result.admins });
      })
      .on("error", error => {
        res.json({ message: "Error " + error });
      });
  });
});

router.get("/webhook-test", (_, res) => {
  console.log("Webhook working");
})

module.exports = router;
