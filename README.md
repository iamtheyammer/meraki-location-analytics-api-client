# meraki-location-analytics-api-client

# Easily get location analytics from your meraki setup.

## Usage
This nodejs app collects data from your Meraki APs through the built in Location analytics (CMX) API. It also stores it in MySQL and allows export of the data in JSON.

## Install
(instructions are for Ubuntu/Debian based systems)

1. Install node.js, mysql and npm `sudo apt-get install npm nodejs nodejs-legacy mysql-server -y`
2. Clone this repository `git clone https://github.com/iamtheyammer/meraki-location-analytics-api-client`
3. Enter the directory `cd meraki-location-analytics-api-client`
4. Initialise npm in the folder `npm init` and only set the title and version and file: app.js.
5. Install dependencies in there `npm install express body-parser fs mysql --save`
6. Modify userData.js and enter required information: either use FTP or `nano userData.js`
7. Start node: `node app.js`

## Credits
Original script by Kris Linquist (klinquis@cisco.com).
I wrote the rest - @iamtheyammer

This was really started when someone tried to deauth our staff network and we needed more data to catch them.
