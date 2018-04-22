/* nodejs Meraki Presence receiver by Kris Linquist (klinquis@cisco.com)
 * Based off ^. I've edited it quite a bit.
 * Edits by iamtheyammer // https://github.com/iamtheyammer/meraki-location-analytics-api-client
*/

var listenport = 9201;

var express = require('express');
var app = express();
var userData = require("./userData.js");
userData = userData.getUserData();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use("/meraki", require("./routes/meraki.js"));
app.use("/get", require("./routes/get.js"));
//app.use("/test", require("./routes/empty_route.js"));

app.listen(userData.listenPort);
console.log("Meraki presence API receiver listening on port " + userData.listenPort);
