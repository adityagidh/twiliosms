const express = require("express");
const app = express();

app.get("/sendSMS", function (req, res) {
  var accountSid = "AC5506ff75bf701114c0d7bac3e2b3694d"; // Your Account SID from www.twilio.com/console
  var authToken = "8a13914903a10eacc8e24ec68a9ba3f5"; // Your Auth Token from www.twilio.com/console

  var twilio = require("twilio");
  var client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: "Testing from API",
      messagingServiceSid: 'MG64d2d8f2598c07c6325f6399d1e5b408',
      to: "+919920211185", // Text this number
    })
    .then((message) => res.send(`The message with id: ${message} was sent!`));
});

app.listen(3000);