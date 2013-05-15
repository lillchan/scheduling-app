var googleapis = require('googleapis'),
    OAuth2Client = googleapis.OAuth2Client,
    GoogleCalendar = require('google-calendar'),
    Users = require('../models/users.js');

var oauth2Client = new OAuth2Client(
  '524876334284.apps.googleusercontent.com',
  '_yi1QfD2NJrKAX5u4cceFKj5',
  'http://localhost:3000');

var accessToken;

var google_calendar = new GoogleCalendar.GoogleCalendar(
   '524876334284.apps.googleusercontent.com',
   '_yi1QfD2NJrKAX5u4cceFKj5',
   'http://localhost:3000');

exports.google_authenticate = function(req, res){
 if (!req.query.code) {
   //Redirect the user to Google's authentication form
   google_calendar.getGoogleAuthorizeTokenURL(
    function(err, redirecUrl) {
       if(err) return res.send(500,err);
       return res.redirect(redirecUrl);
    }
  );

 } else {
   //Get access_token from the code
   google_calendar.getGoogleAccessToken(req.query,
    function(err, access_token, refresh_token) {

       if(err) return res.send(500,err);

       //req.session.access_token = access_token;
       //req.session.refresh_token = refresh_token;
       accessToken = access_token; //is this alright that i'm using a global var?
       return res.redirect('/list_calendars');
   }
  );
 }
};

exports.list_calendars = function(req, res){
  google_calendar.listCalendarList(accessToken,
    function(err, data) {
      if(err) {
        console.log("something went wrong in the calendar_list function!");
        return res.send(500, err);
      }
      return res.render('calendar-list', {calendar_list: data});
    }
  );
};

// exports.get_calendar = function(req, res) {
//   var calendar_id = req.params.calendarId;

//   oauth2Client.credentials = {
//     access_token: accessToken
//   };

//   googleapis.discover('calendar', 'v3').execute(function(err, client) {
//     client.authClient = oauth2Client;
//     client.calendar.events.list({calendarId: calendar_id}).execute();
//     });
// };