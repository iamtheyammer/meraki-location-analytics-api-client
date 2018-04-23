function onOpen(e){SpreadsheetApp.getUi();SpreadsheetApp.getUi().createAddonMenu().addItem("Get data","getCMXData").addItem("Get data by MAC Address","getCMXDataByMac").addToUi()}function getCMXData(){var e=getUserInfo(),t=apiCall(e.getUrl+"?secret="+e.secret+"&timespan="+e.timespan),a=[],s=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results").activate();s.clear(),s.getRange("A1:M1").setValues([["ID","Observing AP's MAC","Client's MAC","IPv4 (if connected)","IPv6 (if connected)","Time of observation","SSID (if connected)","RSSI","MAC Manufacturer","OS","Latitude","Longitude","Location uncertainty (metres)"]]);for(var n=0;n<t.jsonResponse.length;n++){data=t.jsonResponse[n];var o=new Date(0);o.setUTCSeconds(data.seenEpoch),a.push([data.id,data.apMac,data.clientMac,data.ipv4,data.ipv6,o,data.ssid,data.rssi,data.manufacturer,data.os,data.lat,data.lng,data.unc])}Logger.log(a),s.getRange(2,1,t.jsonResponse.length,13).setValues(a)}function getCMXDataByMac(){var e=SpreadsheetApp.getUi(),t=getUserInfo(),a=e.prompt("What MAC Address would you like to search for?","Enter as many MACs as you want, comma separated. Ex. `12:12:12:12:12:12,13:13:13:13:13:13`",e.ButtonSet.OK_CANCEL);if(a.getSelectedButton()==e.Button.OK){var s=apiCall(t.getUrl+"/specificMac?secret="+t.secret+"&timespan="+t.timespan+"&macAddresses="+a.getResponseText()),n=[],o=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results").activate();o.clear(),o.getRange("A1:M1").setValues([["ID","Observing AP's MAC","Client's MAC","IPv4 (if connected)","IPv6 (if connected)","Time of observation","SSID (if connected)","RSSI","MAC Manufacturer","OS","Latitude","Longitude","Location uncertainty (metres)"]]);for(var d=0;d<s.jsonResponse.length;d++){data=s.jsonResponse[d];var r=new Date(0);r.setUTCSeconds(data.seenEpoch),n.push([data.id,data.apMac,data.clientMac,data.ipv4,data.ipv6,r,data.ssid,data.rssi,data.manufacturer,data.os,data.lat,data.lng,data.unc])}Logger.log(n),o.getRange(2,1,s.jsonResponse.length,13).setValues(n)}}function apiCall(e){Logger.log("Attempting an API call to "+e+".");var t=UrlFetchApp.fetch(e,{contentType:"application/json",method:"GET"});Logger.log("API call succeeded. Parsing responses.");var a=t.getContentText(),s=JSON.parse(a);return Logger.log("Completed API call to "+e+"."),{jsonResponse:s,stringResponse:a}}function getUserInfo(){var e=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User data");return{getUrl:e.getRange("A2").getDisplayValue(),secret:e.getRange("B2").getDisplayValue(),timespan:e.getRange("C2").getDisplayValue()}}
