const express = require('express');
const router = express.Router();
const axios = require("axios");

const slack_client_id = process.env.slack_client_id;
const slack_client_secret = process.env.slack_client_secret;
// const slack_scope = "dnd:write,users.profile:write";
// const slack_authorize_url = "https://slack.com/oauth/authorize";
const slack_oauth_url = "https://slack.com/api/oauth.access";
const redirect_uri =
  "https://angcnehdmhhhceijompnlichhojnkdco.chromiumapp.org/oauth";

/* GET users listing. */
router.get('/', function(req, res, next) {
  // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
  if (!req.query.code) {
    res.status(500);
    res.send({"Error": "Looks like we're not getting code."});
    console.log("Looks like we're not getting code.");
  } else {
    // If it's there...
    // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
    const slack_auth_code = req.query.code;
    axios
      .get(
        `${slack_oauth_url}?client_id=${slack_client_id}&client_secret=${slack_client_secret}&code=${slack_auth_code}`
      )
      .then(res => {
        console.log(res);
        return null;
      })
      .catch(e => console.log(e));
  }
});

module.exports = router;
