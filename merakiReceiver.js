/* nodejs Meraki Presence receiver by Kris Linquist (klinquis@cisco.com)
 * Original credit ^.
 * I've made a few edits to make this script better.
 * In the future, this will connect to MongoDB and store the data there.
 * Right now, it's just printing out all data about every client to the console in a human-readable format.
 * The future will be sweeter.
 * Edits by iamtheyammer // https://github.com/iamtheyammer/meraki-location-analytics-api-client
*/


var listenport = 9201;   										//TCP listening port
var secret = "xxxxxx";											//Secret that you chose in the Meraki dashboard
var validator = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";		//Validator string that is shown in the Meraki dashboard


var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get('/meraki', function(req, res){
  res.send(validationdator);
  console.log("sending validation")
});


app.post('/meraki', function(req, res){ 
	try {
	  var merakiAnalytics = JSON.parse(req.body.data);
	  var merakiData = merakiAnalytics.data;
	  if (merakiAnalytics.secret == secret) {
		  for (i=0; i < merakiAnalytics.data.length; i++) {
			  //console.log("client " + merakiAnalytics.probing[i].client_mac + " seen on ap " + merakiAnalytics.probing[i].ap_mac + " with rssi " + merakiAnalytics.probing[i].rssi + " at " + merakiAnalytics.probing[i].last_seen);
			  //here's every bit of data observed
			  console.log('Beginning observation #' + [i]);
			  console.log('The observing AP\'s mac address is ' + merakiData.apMac[i] + ' and it\'s tagged with these tags: ' + merakiData.apTags[i]);
			  console.log('The client\'s mac address is:' + merakiData.observations.clientMac[i]);
			  console.log('The client\'s IPv4 address is: ' + merakiData.observations.ipv4[i]);
			  console.log('The client\'s IPv6 address is: ' + merakiData.observations.ipv6[i]);
			  console.log('The last time we saw the client was: ' + merakiData.observations.seenTime[i]);
			  console.log('The SSID the client is connected to is: ' merakiData.observations.ssid[i] + ' with a RSSI of ' + merakiData.observations.rssi[i]);
			  console.log('The client\'s MAC address manufacturer is: ' + merakiData.observations.manufacturer[i]);
			  console.log('The client\'s operating system is: ' + merakiData.observations.os[i]);
			  console.log('The client\'s location is lat: ' + merakiData.observations.location.lat[i] + ' and it\'s long is: ' + merakiData.observations.location.lat[i]);
			  console.log('End of observation #' + [i]);
		  }
	   } else {
		   console.log("invalid secret from  " + req.connection.remoteAddress);
	   }
	} catch (e) {
		// An error has occured, handle it, by e.g. logging it
  	console.log("Error.  Likely caused by an invalid POST from " + req.connection.remoteAddress + ":");
  	console.log(e);
  	res.end();
  }
  
});

app.listen(listenport);
console.log("Meraki presence API receiver listening on port " + listenport);