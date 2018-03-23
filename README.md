# meraki-location-analytics-api-client

# Easily get location analytics from your meraki setup

## Install
(instructions are for Ubuntu/Debian based systems)

1. Install node.js and npm `sudo apt-get install npm`
2. Clone this repository `git clone https://github.com/iamtheyammer/meraki-location-analytics-api-client`
3. Enter the directory `cd meraki-location-analytics-api-client`
4. Initialise npm in the folder `npm init` and only set the title and version and file: merakiReciever.js.
5. Install express in there `npm install express`
6. Install mongodb in there as well `npm install mongo`
7. Modify merakiReciever.js and set up your validator and secret from the meraki dashboard: either use FTP or `nano merakiReciever.js`
8. Start node: `node merakiReciever.js`

## Credits
Most of this was made by Kris Linquist (klinquis@cisco.com), but I've modified it a little bit.
