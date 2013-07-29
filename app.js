/**
* Module dependencies.
*/

var express = require('express'),
    routes = require('./routes'),
    calendar = require('./routes/calendar'),
    http = require('http'),
    path = require('path');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var gcal = require('google-calendar');
var config = require('./config').Config;

passport.use(new GoogleStrategy({
      clientID: config.consumer_key,
      clientSecret: config.consumer_secret,
      callbackURL: "http://localhost:5000/auth/callback",
      scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    return done(null, profile);
  }
));

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({
	secret: "skjghskdjfhbqigohqdiouk"
}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// routes!
app.all('/', function(req, res) {res.render('index');});
app.all('/oauth', calendar.oauth);
app.all('/authorized', calendar.authorized);
app.all('/calendar-list', calendar.calendarlist);
app.all('/search-events', calendar.searchEvents);

http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
