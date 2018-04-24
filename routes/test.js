// [root]/routes/test.js
// CMX API RECIEVER BY @iamtheyammer



var express = require('express');
var router = express.Router();
var userData = require("../other/discreetFunctions.js");
userData = userData.getUserData();
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

	router.get("/", function(req, res) {
    res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify())
	});

module.exports = router;
