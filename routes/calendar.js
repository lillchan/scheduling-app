exports.searchCalendar = function(req, res) {
    // in express, req.query returns an object containing the parsed query string
    // example query string: http://localhost:3000/?apptName=something&apptStartDate=2013-04-10&apptEndDate=2013-04-23&weekendsOnly=on&apptStartTime=09%3A00&apptEndTime=10%3A00&apptDuration=1
    // var apptName = req.query.apptName;
    // var apptStartDate = req.query.apptStartDate;
    // var apptEndDate = req.query.apptEndDate;
    // var weekendsOnly = req.query.weekendsOnly;
    // var apptStartTime = req.query.apptStartTime;
    // var apptEndTime = req.query.apptEndTime;
    // var apptDuration = req.query.apptDuration;
    // var data = apptName + apptStartDate + apptEndDate + weekendsOnly + apptStartTime + apptEndTime + apptDuration;
    // var dataString = JSON.stringify(data);
    //var reqQuery = JSON.stringify(req.query);
    console.log(req.query);
    //res.send(reqQuery);
};

exports.googleCalendar = function(req, res){
  var google_calendar = new GoogleCalendar.GoogleCalendar(
    '524876334284.apps.googleusercontent.com',
    '_yi1QfD2NJrKAX5u4cceFKj5',
    'http://localhost:3000');

  if(!req.query.code){

    //Redirect the user to Google's authentication form
    google_calendar.getGoogleAuthorizeTokenURL(function(err, redirecUrl) {
        if(err) return res.send(500,err);
        return res.redirect(redirecUrl);
    });

  } else {
    //Get access_token from the code
    google_calendar.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {

        if(err) return res.send(500,err);

        req.session.access_token = access_token;
        req.session.refresh_token = refresh_token;
      return res.redirect('/');
    });
  }
};

var GoogleCalendar = require('google-calendar');
var Users = require('../models/users.js');

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

       req.session.access_token = access_token;
       req.session.refresh_token = refresh_token;

       return res.redirect('/calendarlist');
   }
  );
 }
};

exports.calendar_list = function(req, res) {

  console.log("i'm in the calendar_list function");

  var access_token = req.session.access_token;

  console.log(access_token);

  if(!access_token) return res.redirect('/');

  google_calendar.listCalendarList(access_token,
    function(err, data) {
      if(err) {
        console.log("something went wrong in the calendar_list function!");
        return res.send(500, err);
      }
      
      return res.send(data);
  });

   // in express, req.query returns an object containing the parsed query string
   // example query string: http://localhost:3000/?apptName=something&apptStartDate=2013-04-10&apptEndDate=2013-04-23&weekendsOnly=on&apptStartTime=09%3A00&apptEndTime=10%3A00&apptDuration=1
   // var apptName = req.query.apptName;
   // var apptStartDate = req.query.apptStartDate;
   // var apptEndDate = req.query.apptEndDate;
   // var weekendsOnly = req.query.weekendsOnly;
   // var apptStartTime = req.query.apptStartTime;
   // var apptEndTime = req.query.apptEndTime;
   // var apptDuration = req.query.apptDuration;
   // var data = apptName + apptStartDate + apptEndDate + weekendsOnly + apptStartTime + apptEndTime + apptDuration;
   // var dataString = JSON.stringify(data);
   //var reqQuery = JSON.stringify(req.query);
   // console.log(req.query);
   //res.send(reqQuery);
};
