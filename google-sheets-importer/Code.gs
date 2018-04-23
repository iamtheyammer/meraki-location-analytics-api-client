function onOpen(e) { //The 'e' there tells the system that this doesn't work in certain authentication modes. Something to look into, but not a priority.
  var ui = SpreadsheetApp.getUi();
  SpreadsheetApp.getUi().createAddonMenu() //Tells the UI to add a space to put items under the add-ons menu in docs
      .addItem('Get data', 'getCMXData')
      .addItem('Get data by MAC Address', 'getCMXDataByMac')
      .addToUi(); //Completes the add call.
}

function getCMXData() {

  var userData = getUserInfo();
  var cmxData = apiCall(userData.getUrl + '?secret=' + userData.secret + '&timespan=' + userData.timespan);
  var cmxPrint = [];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results").activate();

  sheet.clear(); //reset the sheet and set the headings
  sheet.getRange('A1:M1').setValues([['ID', 'Observing AP\'s MAC', 'Client\'s MAC', 'IPv4 (if connected)', 'IPv6 (if connected)', 'Time of observation', 'SSID (if connected)', 'RSSI', 'MAC Manufacturer', 'OS', 'Latitude', 'Longitude', 'Location uncertainty (metres)']]);

  /*{"id":5490,"apMac":"0c:8d:db:71:e9:02","clientMac":"00:b3:62:25:ff:a9","ipv4":"/10.1.0.6","ipv6":null,
"seenEpoch":1524409738,"ssid":"M Network v2.5","rssi":37,
"manufacturer":"Apple","os":"iOS","lat":37.54633,"lng":-122.26464,"unc":30},*/
  for (var i = 0; i < cmxData.jsonResponse.length; i++) {
    data = cmxData.jsonResponse[i];
    var realDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    realDate.setUTCSeconds(data['seenEpoch']);
    cmxPrint.push([data['id'],data['apMac'],data['clientMac'],data['ipv4'],data['ipv6'],/*data['seenEpoch']*/realDate,data['ssid'],data['rssi'],data['manufacturer'],data['os'],data['lat'],data['lng'],data['unc']]);
  }
  Logger.log(cmxPrint);
  sheet.getRange(2, 1, cmxData.jsonResponse.length, 13).setValues(cmxPrint);

}

function getCMXDataByMac() {

  var ui = SpreadsheetApp.getUi();
  var userData = getUserInfo();

  var searchMac = ui.prompt('What MAC Address would you like to search for?', 'Enter as many MACs as you want, comma separated. Ex. `12:12:12:12:12:12,13:13:13:13:13:13`', ui.ButtonSet.OK_CANCEL);
  if (searchMac.getSelectedButton() != ui.Button.OK) return;

  var cmxData = apiCall(userData.getUrl + '/specificMac' + '?secret=' + userData.secret + '&timespan=' + userData.timespan + '&macAddresses=' + searchMac.getResponseText());
  var cmxPrint = [];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results").activate();

  sheet.clear(); //reset the sheet and set the headings
  sheet.getRange('A1:M1').setValues([['ID', 'Observing AP\'s MAC', 'Client\'s MAC', 'IPv4 (if connected)', 'IPv6 (if connected)', 'Time of observation', 'SSID (if connected)', 'RSSI', 'MAC Manufacturer', 'OS', 'Latitude', 'Longitude', 'Location uncertainty (metres)']]);

/*{"id":5490,"apMac":"0c:8d:db:71:e9:02","clientMac":"00:b3:62:25:ff:a9","ipv4":"/10.1.0.6","ipv6":null,
"seenEpoch":1524409738,"ssid":"M Network v2.5","rssi":37,
"manufacturer":"Apple","os":"iOS","lat":37.54633,"lng":-122.26464,"unc":30},*/
  for (var i = 0; i < cmxData.jsonResponse.length; i++) {
    data = cmxData.jsonResponse[i];
    var realDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    realDate.setUTCSeconds(data['seenEpoch']);
    cmxPrint.push([data['id'],data['apMac'],data['clientMac'],data['ipv4'],data['ipv6'],/*data['seenEpoch']*/realDate,data['ssid'],data['rssi'],data['manufacturer'],data['os'],data['lat'],data['lng'],data['unc']]);
  }
  Logger.log(cmxPrint);
  sheet.getRange(2, 1, cmxData.jsonResponse.length, 13).setValues(cmxPrint);

}

function apiCall(url) {
  Logger.log('Attempting an API call to ' + url + '.');
  var options = {'contentType':'application/json', 'method':'GET'};
  var response = UrlFetchApp.fetch(url, options); //actual api call
  Logger.log('API call succeeded. Parsing responses.');
  var stringResponse = response.getContentText();
  var jsonResponse = JSON.parse(stringResponse); //parses response as json
  Logger.log('Completed API call to ' + url + '.');
  return {'jsonResponse':jsonResponse, 'stringResponse':stringResponse};
}

function getUserInfo() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User data');

  var range = sheet.getRange('A2'); //grabs app ID
  var getUrl = range.getDisplayValue();

  var range = sheet.getRange('B2'); //grabs analytics report URL
  var secret = range.getDisplayValue();

  var range = sheet.getRange('C2'); //grabs error report URL
  var timespan = range.getDisplayValue();

  return {'getUrl':getUrl,'secret':secret,'timespan':timespan};
}
