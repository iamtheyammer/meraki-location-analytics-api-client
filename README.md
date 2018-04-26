# meraki-location-analytics-api-client

# Easily get location analytics from your meraki setup.

## Table of contents

- [Usage](#usage)
- [Install](#install)
  - [MySQL Instructions](#mysql-instructions-most-people-start-here)
  - [Using a pre-built binary](#using-a-pre-built-binary)
  - [Building from source](#building-from-source)
- [Starting the server](#starting-the-server)
  - [With tmux](#with-tmux)
  - [Without tmux](#without-tmux)
- [API Reference](#api-reference)
- [Changing settings](#changing-settings)
- [Recovery](#recovery)
- [Credits](#credits)


## Usage
This nodejs app collects data from your Meraki APs through the built in Location analytics (CMX) API. It also stores it in MySQL and allows export of the data in JSON.

## Install

### MySQL Instructions (most people start here):
If you plan to install and run the MySQL database this app needs on the same system that will run the app, run these commands on the system hosting both the app and MySQL. If you plan to run MySQL on another system, make sure that it both runs on port 3306 and that it's reachable by this app. On any system you're running MySQL on, #s 4-6 should be applicable in some way.

(instructions are for Ubuntu/Debian based systems)

1. Install mysql server `sudo apt-get install mysql-server -y`
2. Setup MySQL server `sudo mysql_secure_installation`
3. Create a MySQL database - `mysql -u root -p` and enter the root password. Then `CREATE DATABASE [databaseName];`
4. Create a table inside of that database - use the command [here](https://pastebin.com/8NeS7j5d)
5. Add a user with SELECT and INSERT permissions on that database. `GRANT INSERT, SELECT ON [database name].[table name, may be * for all] TO '[username]'@'[server IP, may be localhost]';`
6. Continue with the steps below: [using a pre-built binary (easy)](#using-a-pre-built-binary) or [building from source (more difficult)](#building-from-source)

### Using a pre-built binary
Using a pre-built binary means that you can't see or change the source code. While it might be a little less fun for developers, it's the easiest way to run someone else's app on your system. Using the pre-built binary means that you don't have to install things like `npm`, `nodejs` and other packages necessary for running from source.

Our pre-built binaries are tested on Ubuntu 16.04 64-bit (xenial). While it might (and probably will) work on other linux systems, we've only tested it on 16.04. If the binary doesn't work for you, you'll have to build from source.

1. Download the cmx-api-reciever-[your os flavour].zip file from the releases page.
2. Unzip the file wherever you'd like to run the app
3. Allow the file to be executed - `chmod +x ./app`
4. Start the app - `node app.js`
(Note: if you're using SSH and you want the process to last after your SSH session ends, use a terminal multiplexer like tmux. use instructions: `sudo apt-get install tmux`, `tmux new -s "[session-name]"`. to exit a tmux session, `^B, d`)

### Building from source
Building from source allows the maximum compatibility with systems including Windows, macOS and other linux distros. It also allows developers to run the app with much more customisation and freedom. It's more difficult and requires
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
#### We recommend that most users use tmux.

tmux is short for terminal multiplexer. It allows you to run a terminal session that doesn't care if you terminate your ssh session (and more). You can start up a terminal, run a command, like this app, and it will run even after you terminate your ssh session.
1. Start a tmux session `tmux new -s [cmxapi/sessionNameYouChoose]`
2. Start the app `node app.js`
3. Detach from it `^B, d`
...
4. To re-attach, `tmux a [cmxapi/sessionNameYouChose]` or if you only have one tmux session, `tmux a`

### Without tmux
Just start the app - `node app.js`

## API Reference
View apiReference.md in the root directory of this repository.

## Changing settings
It's easy to change settings you've already set. Just visit http://[yourServerIP]/setup, enter the validator string and your input secret (they're both available in the Meraki dashboard), then you can enter all settings like a fresh installation.  

Important: Your server will may not be able to receive data from Meraki or export data until setup is complete.

## Recovery
If you somehow screw up your server and can't access the settings page, recovery is easy.
To reset your server to factory settings (important: no data will be lost from your MySQL table), follow these instructions:

1. SFTP/SSH into your server and delete `other/userData.json`
2. Make a new file, called `userData.json` in the `other` directory, then paste this into it: `{"status":"setupRequired","port":"9201"}`. You can change the port if needed.
3. Visit http://[yourServerIP]/setup and enter all needed information.

## Credits
Original script (merakiReciever.js) by Kris Linquist (klinquis@cisco.com).
I wrote the rest - @iamtheyammer

This was really started when someone tried to deauth our staff network and we needed more data to catch them.
