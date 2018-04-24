// [root]/routes/home.js
// CMX API RECIEVER BY @iamtheyammer


var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

	router.get("/", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(fs.readFileSync(path.join(__dirname, '../html/home.html')));
	});

module.exports = router;
