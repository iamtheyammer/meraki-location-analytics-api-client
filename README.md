# meraki-location-analytics-api-client

# Easily get location analytics from your meraki setup.

## Usage
This nodejs app collects data from your Meraki APs through the built in Location analytics (CMX) API. It also stores it in MySQL and allows export of the data in JSON.

## Install
(instructions are for Ubuntu/Debian based systems)

1. Install mysql server `sudo apt-get install mysql-server -y`
2. Setup MySQL server `sudo mysql_secure_installation`
3. Install Node.js: follow instructions [here](https://nodejs.org/en/download/package-manager/)
4. Clone my repository `git clone https://github.com/iamtheyammer/meraki-location-analytics-api-client`
5. Enter the directory `cd meraki-location-analytics-api-client`
6. Install required dependencies `npm install express body-parser fs mysql path --save`
7. Start the app - `node app.js`
(Note: if you're using SSH and you want the process to last after your SSH session ends, use a terminal multiplexer like tmux. use instructions: `sudo apt-get install tmux`, `tmux new -s "[session-name]"`. to exit a tmux session, `^B, d`)
8. Use a web browser and visit `http://[yourServerIP]:9201/setup`
9. Fill out the setup fields. - your POST URL is `http://[yourServerIP]:[portYouChoose]/meraki`
10. Restart your Nodejs script `^C` to stop it, `node app.js` to re-start it.
11. Done!


## Starting the server

### With tmux
1. Start a tmux session `tmux new -s [cmxapi/sessionNameYouChoose]`
2. Start the app `node app.js`
3. Detach from it `^B, d`
...
4. To re-attach, `tmux a [cmxapi/sessionNameYouChose]` or if you only have one tmux session, `tmux a`

### Without tmux
Just start the app - `node app.js`

## API Reference
View apiReference.md in the root directory of this repository.

## Credits
Original script (merakiReciever.js) by Kris Linquist (klinquis@cisco.com).
I wrote the rest - @iamtheyammer

This was really started when someone tried to deauth our staff network and we needed more data to catch them.
