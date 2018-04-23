## API Reference
This is the document containing how to use the APIs in this project.

## Table of contents

#### Inputting data
- [Validator secret](#validator-secret)
- [Reporting data](#reporting-data)

#### Retrieving data
- [By timespan only](#retrieving-data-by-timespan-only)
- [By timespan and MAC Address](#retrieving-data-by-MAC-addresses-and-timespan)

## Validator secret
Meraki will make a GET request to `http://[yourServerIP]/meraki`.
You can too, you'll just get the validator string back.

## Reporting data
Only Meraki should make a POST request to `http://[yourServerIP]/meraki`.
You should not be making requests to that URL.

## Retrieving data by timespan only
Make a GET request to `http://[yourServerIP]/get` with params:

- Secret (`secret`), The secret you chose in userData.gs. If you have a separate secret for inputting and retrieving data, enter the secret for retrieving data. Ex: `myRetrievalSecret`.
- Timespan ( `timespan`), A timespan in seconds to retrieve data for. Maximum is 2592000 seconds (1 month). Ex. `86400`.

Example of full GET request: `http://[yourServerIP]/get?secret=myRetrievalSecret&timespan=86400`.  

Sample response:  
`{"id":6546,"apMac":"12:12:12:12:12","clientMac":"13:13:13:13:13:13","ipv4":null,"ipv6":null,"seenEpoch":1524423972,"ssid":null,"rssi":48,"manufacturer":"Apple","os":null,"lat":35.3563,"lng":-122.5677,"unc":2},`

## Retrieving data by MAC address(es) and timespan
Make a GET request to `http://[yourServerIP]/get/specificMac` with params:

- Secret (`secret`), The secret you chose in userData.gs. If you have a separate secret for inputting and retrieving data, enter the secret for retrieving data. Ex: `myRetrievalSecret`.
- Timespan (`timespan`), A timespan in seconds to retrieve data for. Maximum is 2592000 seconds (1 month). Ex. `86400`.
- MAC Address(es) (`macAddresses`), The MAC address you'd like data for. Submit as many as you'd like, in a comma separated list. Ex. `13:13:13:13:13:13` or `13:13:13:13:13:13,12:12:12:12:12:12,11:11:11:11:11:11`.

Example of full GET request: `http://[yourServerIP]/get/?secret=myRetrievalSecret&timespan=86400&macAddress=13:13:13:13:13:13,13:13:13:13:13:13,12:12:12:12:12:12,11:11:11:11:11:11`.  

Sample response:  
`{"id":6546,"apMac":"12:12:12:12:12","clientMac":"13:13:13:13:13:13","ipv4":null,"ipv6":null,"seenEpoch":1524423972,"ssid":null,"rssi":48,"manufacturer":"Apple","os":null,"lat":35.3563,"lng":-122.5677,"unc":2},{"id":6546,"apMac":"12:12:12:12:12","clientMac":"11:11:11:11:11:11","ipv4":null,"ipv6":null,"seenEpoch":1524423972,"ssid":null,"rssi":48,"manufacturer":"Apple","os":null,"lat":35.3563,"lng":-122.5677,"unc":2},`
