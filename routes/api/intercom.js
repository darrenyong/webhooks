const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const https = require("https");
const Intercom = require("intercom-client");

const intercomKey = process.env.intercomKey || keys.intercomKey
const intercomClient = new Intercom.Client({ token: `${intercomKey}` });

router.get("/test", (_, res) => {
  const test_conversationId = 24434924512;

  intercomClient.conversations.find({ id: `${test_conversationId}` }, (result) => {
    let tag = result.body.tags.tags
    res.json({ msg: result });

  });

  // https.get(`https://api.intercom.io/conversations/${test_conversationId}`, convo_options, response => {
  //     var raw = "";

  //     response.on("data", chunk => {
  //       raw += chunk;
  //     });

  //     response.on("end", () => {
  //         let result = JSON.parse(raw);
  //         let tag = result.tags.tags
          
  //         res.json({ result: result });
  //         // If a conversation does not have a tag, open it and add a note telling the user to tag it
  //         if (!tag.length) {
  //           let note_data = JSON.stringify({
  //             "admin_id": 3293893,
  //             "body": "Please tag the conversation! :)",
  //             "user": {
  //               "id": "5d113de67801d7b2d885e59f"
  //             }
  //           });

  //           intercomClient.notes.create(note_data);

  //           res.json({ msg: "This convo does not have a tag" });

  //         } else if (tag.length) {
  //           res.json({ msg: "This convo does have a tag! Congrats" });
  //         }
          
  //       })
  //       .on("error", error => {
  //         res.json({ message: "Error " + error });
  //       });
  //   }
  // );
});

router.post("/webhook-test", (req, res) => {
  let conversationId = req.body.data.item.id;

  // Options for the Conversation API Call
  const options = {
    headers: {
      "Authorization": `Bearer ${intercomKey} `,
      "Accept": "application/json"
    }
  };

  // Actual Webhook API
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
