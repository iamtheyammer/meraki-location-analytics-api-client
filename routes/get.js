// [root]/routes/get.js
// CMX API RECIEVER BY @iamtheyammer

var express = require('express'); //requires
var router = express.Router();
var mysql = require('mysql');
var discreetFunctions = require("../other/discreetFunctions.js");
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

router.get("/", function(req, res) {
  var userData = discreetFunctions.getUserData();
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

  var allowedRetrievalIPs = userData.allowedRetrievalIPs.split(',');
  if (allowedRetrievalIPs[0] != '*') {
    var validRetrievalIP = false;
    for (var i = 0; i < allowedRetrievalIPs; i++) {
      if (req.ip.indexOf(allowedRetrievalIPs[i]) != -1) {
        validRetrievalIP = true;
        break;
      } else {
        validRetrievalIP = false;
      }
    }
    if (validRetrievalIP == false) {
      console.log(req.ip + ' was blocked from retrieving data.');
      res.setHeader('Content-Type', 'application/json');
  	  return res.send(JSON.stringify({"status":"error", "message":"your IP is not on the list of approved retrieval ips. if you\'re using cloudflare (or a non-ip forwarding cdn), turn this feature off."}));
    }
  }

  var connection = mysql.createConnection({
    host     : userData.mySqlHost,
    user     : userData.mySqlUser,
    password : userData.mySqlUserPassword,
    database : userData.mySqlDatabase
  });
  var time = new Date() / 1000; //get epoch time
  time -= req.query.timespan;
  var sql = 'SELECT * FROM ' + userData.mySqlTable + ' WHERE seenEpoch>=' + time + ';';
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

router.get("/specificMAC", function (req, res) {
  var userData = discreetFunctions.getUserData();
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

  if (!req.query.macAddresses || req.query.macAddresses.length < 17) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify({"status":"error", "message":"specfied MAC address is too short or you didn't specify one.",'providedMacAddresses':req.query.macAddresses}));
  }

  var allowedRetrievalIPs = userData.allowedRetrievalIPs.split(',');
  if (allowedRetrievalIPs[0] != '*') {
    var validRetrievalIP = false;
    for (var i = 0; i < allowedRetrievalIPs.length; i++) {
      if (req.ip.indexOf(allowedRetrievalIPs[i]) != -1) {
        validRetrievalIP = true;
        break;
      } else {
        validRetrievalIP = false;
      }
    }
    if (validRetrievalIP == false) {
      console.log(req.ip + ' was blocked from retrieving data.');
      res.setHeader('Content-Type', 'application/json');
      return res.send(JSON.stringify({"status":"error", "message":"your IP is not on the list of approved retrieval ips. if you\'re using cloudflare (or a non-ip forwarding cdn), turn this feature off."}));
    }
  }

  var connection = mysql.createConnection({
    host     : userData.mySqlHost,
    user     : userData.mySqlUser,
    password : userData.mySqlUserPassword,
    database : userData.mySqlDatabase
  });
  var time = new Date() / 1000; //get epoch time
  time -= req.query.timespan;
  //make the SQL statement:
  var sql = 'SELECT * FROM ' + userData.mySqlTable + ' WHERE clientMac IN (' ;
  var selectedMacs = req.query.macAddresses.split(',');
  for (var i = 0; i < selectedMacs.length; i++) {
    sql += mysql.escape(selectedMacs[i]) + ',';
  }
  if (sql.endsWith(',')) sql = sql.slice(0, sql.length-1); //make sure we don't have a trailing comma
  sql += ') AND seenEpoch>=' + time + ';';
  //final SQL statement should look like this:
  // SELECT * FROM [myTable] WHERE clientMac IN ('12:12:12:12:12:12', '13:13:13:13:13:13') AND seenEpoch < 1524463665;

  //OLD -- var sql = 'SELECT * FROM ' + userData.mySqlTable + ' WHERE seenEpoch>=' + time + ' AND clientMac=' + mysql.escape(req.query.macAddress) + ';';
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
