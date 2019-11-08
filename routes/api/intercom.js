const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const https = require("https");

const intercomKey = process.env.intercomKey || keys.intercomKey

router.get("/test", (_, res) => {
  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${intercomKey}`,
  //     Accept: "application/json"
  //   }
  // };

  // https.get("https://api.intercom.io/admins/", options, response => {
  //   var raw = "";

  //   response.on("data", chunk => {
  //     raw += chunk;
  //   });

  //   response
  //     .on("end", () => {
  //       let result = JSON.parse(raw);
  //       res.json({ admins: result.admins });
  //     })
  //     .on("error", error => {
  //       res.json({ message: "Error " + error });
  //     });
  // });
});

router.post("/webhook-test", (req, res) => {
  let conversationId = req.body.data.item.id;

  const options = {
    headers: {
      Authorization: `Bearer ${intercomKey} `,
      Accept: "application/json"
    }
  };

  https.get(`https://api.intercom.io/conversations/${conversationId}`, options, (response) => {
    let raw = ""

    response.on("data", (chunk) => {
      raw += chunk;
    });

    response.on("end", () => {
      let result = JSON.parse(raw);
      console.log(raw);
    }).on("error", (error) => {
      res.json({ message: "Error " + error });
    })
  });
})

module.exports = router;
