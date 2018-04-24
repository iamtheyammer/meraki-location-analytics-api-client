/* nodejs Meraki Presence receiver by Kris Linquist (klinquis@cisco.com)
 * Based off ^. I've edited it quite a bit.
 * Edits by iamtheyammer // https://github.com/iamtheyammer/meraki-location-analytics-api-client
*/


var express = require('express');
var app = express();
var userData = require("./other/discreetFunctions.js");
userData = userData.getUserData();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(require("./routes/home.js"));
app.use("/meraki", require("./routes/meraki.js"));
app.use("/get", require("./routes/get.js"));
app.use("/setup", require("./routes/setup.js"));
app.use("/test", require("./routes/test.js"));

app.listen(userData.port);
console.log("Meraki presence API receiver listening on port " + userData.port);
