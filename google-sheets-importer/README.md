## Google Sheets Importer
This is a little piece of code that allows you to pull in the data from your MySQL server collected by this program into Google Sheets.

## Install
1. Click [here](https://docs.google.com/spreadsheets/d/1D5eR_3saMXXOZu6a0D3iOQVDl1nDXFx0ZWkfDmpUbUg/edit#gid=0) and make a copy of that Google Sheet.
2. Go to the `User data` sheet and put in your information.
3. Go to Tools -> Script editor
4. Click on 'Untitled project' in the top left and give this a name. I used 'Node CMX To Spreadsheet.'
5. Paste in the contents of `minified.gs`
6. Go to Run -> Run function -> getCMXData
7. Approve the required permissions
8. Wait until the script is done running and your data should be in the sheet called `Results`.

## Post first run
1. Open your Google Sheet
2. Go to Add-ons -> [whatever you titled your project in Install step 4] -> Get data
3. Watch your data flow in like magic!

## Credits
Completely built by me. (@iamtheyammer)
