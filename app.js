/**
* Module dependencies.
*/

var express = require('express'),
    routes = require('./routes'),
    calendar = require('./routes/calendar'),
    http = require('http'),
    path = require('path'),
    pg = require('pg');

var conString = "tcp://postgres:1234@localhost/postgres"
var client = new pg.Client(conString);
//client.connect();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
 app.use(express.errorHandler());
 app.set('db connection', "tcp://postgres:5432@localhost/postgres");
}

// for production
if ('production' == app.get('env')) {
	app.set('db connection', process.env.DATABASE_URL);
}

app.all('/', calendar.google_authenticate);
app.all('/list_calendars', calendar.list_calendars);
app.all('/get_calendar/:id', calendar.get_calendar);
//app.all('/googledirections', function(req, res){res.render('google-directions.jade');});
//app.all('/calendarlist', calendar.calendar_list);

http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
