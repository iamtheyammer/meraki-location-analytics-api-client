// [root]/routes/meraki.js
// CMX API RECIEVER BY @iamtheyammer

var express = require('express'); //requires
var router = express.Router();
var mysql = require('mysql');
var userData = require("../userData.js");
userData = userData.getUserData();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res){ //final path [server]:[port]/meraki
  res.send(userData.validator); //get and send validator string
  console.log("sending validation");
});

router.post('/', jsonParser, function(req, res){ //final path [server]:[port]/meraki
	try {
	  var merakiData = req.body.data;
	  if (req.body.secret == userData.secret) {
      var connection = mysql.createConnection({
        host     : userData.mySqlHost,
        user     : userData.mySqlUser,
        password : userData.mySqlUserPassword,
        database : userData.mySqlDatabase
      }); //connect to mysql

      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }});
		  for (i=0; i<merakiData.observations.length; i++) {
        //this lot makes up the SQL command, accounting for null data from Meraki. basically it just concatenates.
        var sql = 'INSERT INTO ' + userData.mySqlTable + ' SET ';
        if (merakiData.apMac != null) sql += ('apMac=' + mysql.escape(merakiData.apMac) + ', ') ;
        if (merakiData.observations[i].clientMac != null) sql += ('clientMac=' + mysql.escape(merakiData.observations[i].clientMac) + ', ');
        if (merakiData.observations[i].ipv4 != null) sql += ('ipv4=' + mysql.escape(merakiData.observations[i].ipv4) + ', ');
        if (merakiData.observations[i].ipv6 != null) sql += ('ipv6=' + mysql.escape(merakiData.observations[i].ipv6) + ', ');
        if (merakiData.observations[i].seenEpoch != null) sql += ('seenEpoch=' + mysql.escape(merakiData.observations[i].seenEpoch) + ', ');
        if (merakiData.observations[i].ssid != null) sql += ('ssid=' + mysql.escape(merakiData.observations[i].ssid) + ', ');
        if (merakiData.observations[i].rssi != null) sql += ('rssi=' + mysql.escape(merakiData.observations[i].rssi) + ', ');
        if (merakiData.observations[i].manufacturer != null) sql += ('manufacturer=' + mysql.escape(merakiData.observations[i].manufacturer) + ', ');
        if (merakiData.observations[i].os != null) sql += ('os=' + mysql.escape(merakiData.observations[i].os) + ', ');
        if (merakiData.observations[i].location.lat != null) sql += ('lat=' + mysql.escape(merakiData.observations[i].location.lat) + ', ');
        if (merakiData.observations[i].location.lng != null) sql += ('lng=' + mysql.escape(merakiData.observations[i].location.lng) + ', ');
        if (merakiData.observations[i].location.unc != null) sql += ('unc=' + mysql.escape(merakiData.observations[i].location.unc) + ';');

        if (sql.endsWith(", ")) sql = sql.slice(0, sql.length-2) + ';'; //if the sql string doesn't end with a semicolon, add one
        //console.log(sql);
        //console.log(merakiData.observations[i].location);
        connection.query(sql, function (error) {
          res.setHeader('Content-Type', 'application/json'); //if there's an error, send it as a message and throw it
          if (error) res.send(JSON.stringify({"status":"error", "message":"SQL error", "fullMessage":error}));
          if (error) throw error;
        });
		  }
      connection.end();
      console.log(merakiData.observations.length + ' observations successfully added to your MySQL table!');
	 } else {
		 console.log("invalid secret from  " + req.connection.remoteAddress);
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"status":"error", "message":"invalid secret"}));
	 }
	} catch (e) {
		// An error has occured, handle it, by e.g. logging it
  	console.log("Error. Could be caused by an invalid POST from " + req.connection.remoteAddress + ":");
  	console.log(e);
  	res.end();
  }

});

module.exports = router;
