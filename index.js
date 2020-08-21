const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'js')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

//
// var fs = require('fs');
// var readline = require('readline');
// var {google} = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
//
// // If modifying these scopes, delete your previously saved credentials
// // at ~/.credentials/youtube-nodejs-quickstart.json
// var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';
//
// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//     if (err) {
//         console.log('Error loading client secret file: ' + err);
//         return;
//     }
//     // Authorize a client with the loaded credentials, then call the YouTube API.
//     authorize(JSON.parse(content), getChannel);
// });
//
// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//     var clientSecret = credentials.client_secret; //var clientSecret = credentials.installed.client_secret;
//     var clientId = credentials.client_id;
//     // var redirectUrl = credentials.installed.redirect_uris[0];
//     var oauth2Client = new OAuth2(clientId, clientSecret, /*redirectUrl*/);
//
//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, function(err, token) {
//         if (err) {
//             getNewToken(oauth2Client, callback);
//         } else {
//             oauth2Client.credentials = JSON.parse(token);
//             callback(oauth2Client);
//         }
//     });
// }
//
// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
// function getNewToken(oauth2Client, callback) {
//     var authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES
//     });
//     console.log('Authorize this app by visiting: ', authUrl);
//     var rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.question('Enter the code from that page here: ', function(code) {
//         rl.close();
//         oauth2Client.getToken(code, function(err, token) {
//             if (err) {
//                 console.log('Error while trying to retrieve access token', err);
//                 return;
//             }
//             oauth2Client.credentials = token;
//             storeToken(token);
//             callback(oauth2Client);
//         });
//     });
// }
//
// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
// function storeToken(token) {
//     try {
//         fs.mkdirSync(TOKEN_DIR);
//     } catch (err) {
//         if (err.code != 'EEXIST') {
//             throw err;
//         }
//     }
//     fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) throw err;
//         console.log('Token stored to ' + TOKEN_PATH);
//     });
// }
//
// /**
//  * Lists the names and IDs of up to 10 files.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function getChannel(auth) {
//     var service = google.youtube('v3');
//         service.videos.list({
//         auth: auth,
//         part: 'liveStreamingDetails',
//         forUsername: 'GoogleDevelopers'
//     }, function(err, response) {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return;
//         }
//         var videos = response.data.items;
//         console.log("THESE ARE THE RESPONSE============: " + videos);
//     });
// }



//======================================================================================

// function hi () {
//     console.log("hiii");
// }
//
// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
//         .then(function() {
//             console.log("Sign-in successful");
//         }, function(err) {
//             console.error("Error signing in", err);
//         });
// }
//
// function loadClient() {
//     gapi.client.setApiKey("AIzaSyChuEvw1Ii6dMd2dhYlPfLCH49jtRe-CZk");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() {
//             console.log("GAPI client loaded for API");
//         }, function(err) {
//             console.error("Error loading GAPI client for API", err);
//         });
// }
//
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//     return gapi.client.youtube.videos.list({
//         "part": ["liveStreamingDetails"],
//         "id": ["PL-GXzQU_x0"]
//     }).then(function(response) {
//         console.log(response);
//
//     }, function(err) {
//         console.error("Error in API request", err);
//     });
// }