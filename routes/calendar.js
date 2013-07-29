var googleapis = require('googleapis'),
	OAuth2Client = googleapis.OAuth2Client,
	moment = require('moment'),
	http = require('http'),
	config = require('../config').Config,
	google = require('node-google-api')(config.api_key);

var oauth2Client =
	new OAuth2Client(config.consumer_key, config.consumer_secret, 'http://localhost:5000/authorized');

//check if there's an access token stored in the session
//if there is an access token, then redirect to route that requests calendar list
//if not, then request an authorization code to get an access token
exports.oauth = function(req, res) {
	if (req.session.accessToken) {
		res.redirect('/calendar-list');
	}
	var url = oauth2Client.generateAuthUrl({
		scope: 'https://www.googleapis.com/auth/calendar'
	});
	res.redirect(url);
};

//with the authorization code, request an access token
exports.authorized = function(req, res) {
	var authCode = req.query.code;
	oauth2Client.getToken(authCode, function(err, tokens) {
		var accessToken = tokens.access_token;
		req.session.accessToken = accessToken;
		res.redirect('/calendar-list');
	});
};

//send get request for list of user's calendars
exports.calendarlist = function(req, res) {
	var accessToken = req.session.accessToken;
	google.build(function(api) {
		api.calendar.calendarList.list(
		{
			access_token: accessToken
		},
		function(calendars) {
			res.render('calendar-list', {calendarList: calendars.items});
		});
	});
};

//query google calendar API for free blocks of time
exports.searchEvents = function(req, res) {
	var accessToken = req.session.accessToken;
	//grab data from search form
	var startDate = req.body.apptStartDate;
	var startTime = req.body.apptStartTime;
	var endDate = req.body.apptEndDate;
	var endTime = req.body.apptEndTime;
	var calIdTimezone = req.body.calendarList.split(" ");
	var calId = calIdTimezone[0];
	var calTimezone = calIdTimezone[1];
	//TODO: check datetimes in user specified range to see if there are free blocks
	res.send('searching for free blocks of time!');
};