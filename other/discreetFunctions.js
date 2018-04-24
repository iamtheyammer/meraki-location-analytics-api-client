// [root]/other/discreetFunctions.js
// CMX API RECIEVER BY @iamtheyammer

var fs = require('fs');
var path = require('path');

module.exports = {
  // totally commented out; getUserData: function() {
  //
  //
  //
  //   /*
  //
  //     (please don't touch anything above this line!)
  //
  //     USER DATA SETTINGS FOR MERAKIBLOCKI CMX API APP
  //
  //     Enter your data according to the instructions below.
  //
  //   */
  //
  //   /*
  //   *
  //   * SERVER SETTINGS
  //   *
  //   */
  //
  //   /*
  //     Secret you chose in the Meraki dashboard.
  //     This will, by default, be used for setting and retreving data.
  //     If you'd like to use different secrets, you can set a secret for retreving data at the bottom of this page.
  //     Make it secure!
  //   */
  //   var secret = 'dimoodle';
  //
  //   /*
  //     Validator string given to you in the Meraki dashboard.
  //     It is different for every network.
  //   */
  //   var validator = 'a4d1a53f26e866a7ad620b98b675cadab4c3b510';
  //
  //   /*
  //     The port you'd like the server to listen on.
  //     If you set it over 1000, you'll need to use sudo to run the script.
  //     If you plan to use NGINX or another reverse proxy, it's common to set it to something like 8000 or 8080.
  //     If you're just testing, leaving it at the default should work just fine. (default is 9021).
  //     Most ubuntu systems have ufw installed. If you're not using a reverse proxy (like NGINX), make sure you
  //   `sudo ufw allow [your port #]`
  //   */
  //   var listenPort = 9201;
  //
  //   /*
  //   *
  //   * MYSQL SETTINGS
  //   *
  //   */
  //
  //   /*
  //     IP address of the server that hosts MySQL for you.
  //     If it's running on this machine, enter `localhost`.
  //   */
  //   var mySqlHost = 'localhost';
  //
  //   /*
  //     The user that the script will use to log into MySQL.
  //     We recommend that you make a non-root user that has INSERT and SELECT permissions.
  //     Create a user with those permissions with these SQL commands:
  //     `CREATE USER '[username]'@'[server IP, may be localhost]' IDENTIFIED BY '[password]';`
  //     `GRANT INSERT, SELECT ON [database name].[table name, may be * for all] TO '[username]'@'[server IP, may be localhost]';`
  //   */
  //   var mySqlUser = 'cmxapi';
  //
  //   /*
  //     Password for the user that the script will use to log into MySQL.
  //   */
  //   var mySqlUserPassword = 'EMAa6dBtb49twHV7qTd7G[rnGK9NAx8jC&Jk6Y6WTGcQsgAZ8yxjZdwdTbLtTWYb';
  //
  //   /*
  //     Database name that holds your table.
  //   */
  //   var mySqlDatabase = 'cmxapi';
  //
  //   /*
  //     Table name that will hold your data.
  //     Need help creating the table? Run the SQL command here: https://pastebin.com/8NeS7j5d
  //   */
  //   var mySqlTable = 'scanningapi';
  //
  //   /*
  //
  //   /*
  //   *
  //   * RETRIVAL SETTINGS
  //   *
  //   */
  //
  //   /*
  //     Would you like to use a different secret for retreiving data than inputting data?
  //     `true` for yes and `false` for no.
  //   */
  //   var differentSecrets = true;
  //
  //   /*
  //     If you put true above, enter a secret for retreving your data.
  //   */
  //   var retrievalSecret = 'myDimoodle';
  //
  //   /*
  //     Would you like to only allow certain IP addresses to retrieve data?
  //     By default, this value is `*`, which will allow any IP address to retreive data.
  //     An example of how this line would look with 3 allowed IPs is below:
  //     var allowedRetrievalIPs = ['10.0.0.45', '162.674.368.356', '35.675.87.478'];
  //     Currently, we do not support CIDR subnets.
  //   */
  //   var allowedRetrievalIPs = ['*'];
  //
  //   /*
  //     END OF USER DATA SETTINGS
  //
  //     (please don't touch anything below this line!)
  //
  //   */
  //
  //   if (differentSecrets == false) {
  //     return {'secret':secret, 'validator':validator, 'listenPort':listenPort, 'mySqlHost':mySqlHost, 'mySqlUser':mySqlUser, 'mySqlUserPassword':mySqlUserPassword, 'mySqlDatabase':mySqlDatabase, 'mySqlTable':mySqlTable, 'allowedRetrievalIPs':allowedRetrievalIPs};
  //   } else if (differentSecrets == true) {
  //     return {'secret':secret, 'validator':validator, 'listenPort':listenPort, 'mySqlHost':mySqlHost, 'mySqlUser':mySqlUser, 'mySqlUserPassword':mySqlUserPassword, 'mySqlDatabase':mySqlDatabase, 'mySqlTable':mySqlTable, 'allowedRetrievalIPs':allowedRetrievalIPs, 'retrievalSecret':retrievalSecret};
  //   } else {
  //     throw new Error("Your value for differentSecrets in userData.js is invalid. It must be either `true` or `false`.");
  //   }
  // } //completely commented out

  getUserData: function() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, './userData.json')));
  }
};
