var db = require('pg');
express = require('express');

var app = express();

var getUser = exports.getUser = function(by, val, callback) {
	var database = new db.Client(app.get('db connection'));
	database.connect();

	var SQL = "SELECT * FROM users WHERE ";
	switch (by) {
		case 'accessToken':
			SQL += 'access_token = ' + val;
			break;
		case 'id':
			SQL += 'id = ' + val;
			break;
		case 'email':
			SQL += 'email = ' + val;
			break;
	}

	var query = database.query(SQL);

	query.on('row', function(row) {
		callback(row);
	});

	query.on('end', function() {
		database.end();
	});
}

var setUser = exports.setUser = function(access_token) {
	var database = new db.Client(app.get('db connection'));
	database.connect();

	var SQL = "INSERT INTO users(access_token, email) values(" + access_token + ")";

	var query = database.query(SQL);

	query.on('end', function() {
		database.end();
	});
}
