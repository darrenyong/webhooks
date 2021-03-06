const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Intercom = require("intercom-client");

const intercomKey = process.env.INTERCOM_KEY || keys.intercomKey;
const intercomClient = new Intercom.Client({ token: `${intercomKey}` });
const intercomAdminId = process.env.INTERCOM_ADMIN_ID || keys.intercomAdminId

router.get("/test", (_, res) => {
  const test_conversationId = 24434924512;

  intercomClient.conversations.find({ id: `${test_conversationId}` }, (result) => {
    let tag = result.body.tags.tags    

    if (!tag.length) {
      let test_note_data = {
        id: `${test_conversationId}`,
        type: "admin",
        message_type: "note",
        admin_id: intercomAdminId,
        body: "Please tag the conversation! :)",
        assignee_id: 0
        };

      intercomClient.conversations.reply(test_note_data, (result) => {
        if (result) {
         let open_data = {
           id: `${test_conversationId}`,
           type: "admin",
           message_type: "open",
           admin_id: intercomAdminId,
           assignee_id: 0
         };

         intercomClient.conversations.reply(open_data, result => {
           console.log("Note added and conversation re-opened!");
           return res.json({});
         }); 
        }
      });
    } else {
      res.json({ msg: "This convo has a tag! Congrats!" });
    }

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

router.post("/webhook", (req, res) => {
  let conversationId = req.body.data.item.id;
  let assigneeId = req.body.data.item.assignee.id || 0;

  intercomClient.conversations.find({ id: `${conversationId}` }, (result) => {
    let tag = result.body.tags.tags

    if (!tag.length) {
      let note_data = {
        id: `${conversationId}`,
        type: "admin",
        message_type: "note",
        admin_id: intercomAdminId,
        body: "Please tag the conversation! :)",
        assignee_id: `${assigneeId}`
      }

      
      intercomClient.conversations.reply(note_data, (result) => {
        if (result) {
          let open_data = {
            id: `${conversationId}`,
            type: "admin",
            message_type: "open",
            admin_id: intercomAdminId,
            assignee_id: `${assigneeId}`
          }
          
          intercomClient.conversations.reply(open_data, (result) => {
            // console.log("Note added and conversation re-opened!");
            res.status(200).send({ msg: "Note added and conversation re-opened!" })
          })
        } else {
          res.status(404).send({ error: "Conversation now found" });
        }
        res.status(200);
      })      
    } else {
      // console.log("This convo has a tag! Congrats!")
      res.status(200).send({ msg: "This conversation already has a tag! Great job!" });
    }
  })
})

module.exports = router;
