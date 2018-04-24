// [root]/routes/setup.js
// CMX API RECIEVER BY @iamtheyammer

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

/*try {
  fs.accessSync(myPath, fs.constants.R_OK | fs.constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
  console.log(err);
}*/

router.get("/", function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  return res.send(fs.readFileSync(path.join(__dirname, '../html/setup.html')));
});

router.post("/post", urlencodedParser, function(req, res) {
  if (!req.body.allowedRetrievalIPs) {
    var allowedRetrievalIPs = '*';
  }
  var userData = {'validator':req.body.validator,'secret':req.body.secret,'port':req.body.port,'mySqlHost':req.body.mySqlHost,'mySqlUser':req.body.mySqlUser,'mySqlUserPassword':req.body.mySqlUserPassword,'mySqlDatabase':req.body.mySqlDatabase,'mySqlTable':req.body.mySqlTable,'retrievalSecret':req.body.retrievalSecret,'allowedRetrievalIPs':req.body.allowedRetrievalIPs};
  var userDataPath = path.join(__dirname, '../other/userData.json');

  fs.writeFileSync(userDataPath, JSON.stringify(userData));
  res.setHeader('Content-Type', 'text/html');
  return res.send('<head><meta http-equiv="refresh" content="0; url=/?done=true" /></head>');
});

module.exports = router;
