// [root]/routes/get.js
// CMX API RECIEVER BY @iamtheyammer

var express = require('express'); //requires
var router = express.Router();
var mysql = require('mysql');
var userData = require("../userData.js");
userData = userData.getUserData();
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

router.get("/", function(req, res) {

  var queryResults = [];
  if (userData.retrievalSecret) { //check secrets
    if (req.query.secret != userData.retrievalSecret) {
      res.setHeader('Content-Type', 'application/json'); //if invalid secret, let user know
  	  return res.send(JSON.stringify({"status":"error", "message":"invalid secret.", "providedSecret":req.query.secret}));
    }
  } else {
    if (req.query.secret != userData.secret) {
      res.setHeader('Content-Type', 'application/json'); //if invalid secret, let user know
	     return res.send(JSON.stringify({"status":"error", "message":"invalid secret.", "providedSecret":req.query.secret}));
     }
  }

  if (req.query.timespan > 2592000 || !req.query.timespan) {
    res.setHeader('Content-Type', 'application/json');
	  return res.send(JSON.stringify({"status":"error", "message":"invalid/missing timespan. max of 2592000 seconds (1 month)"}));
  }

  var connection = mysql.createConnection({
    host     : userData.mySqlHost,
    user     : userData.mySqlUser,
    password : userData.mySqlUserPassword,
    database : userData.mySqlDatabase
  });
  var time = new Date() / 1000; //get epoch time
  time -= req.query.timespan;
  var sql = 'SELECT id, apMac, clientMac, ipv4, ipv6, seenEpoch, ssid, rssi, manufacturer, os, lat, lng, unc FROM ' + userData.mySqlTable + ' WHERE seenEpoch>=' + time + ';';
  connection.query(sql, function (error, results, fields) {
    queryResults = results;
    if (!queryResults[0]) {
      res.setHeader('Content-Type', 'application/json');
      return res.send(JSON.stringify({"status":"error", "message":"no data found for that timespan."}))
    }
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(queryResults));
  });
});







module.exports = router;
