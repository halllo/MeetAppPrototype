var express = require('express');
var app = express();
var _ = require('underscore');
var Activities = require('./lib/Activities');


var mongodb = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/meetappprototype'
var port = process.env.VMC_APP_PORT || process.env.PORT || 1337

var activities = new Activities(mongodb);

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(app.router);
});
app.listen(port);

app.get('/activities', function(req, res){
	var response = res;
	activities.all(function (items){
		response.send(200, {
			activities: _.map(items, function(item) {
				return {
					name: item.name,
					location: item.location,
					date: item.date,
					user: item.user,
					friends: item.friends
				};
			})
		});
	});
});

app.put('/activities', function(req, res){
	var response = res;
	var activity = req.body;

	activities.create(activity, function (err, activity){
		if (err) response.send(404, err.message);
		else response.send(200, {
			name: activity.name,
			location: activity.location,
			date: activity.date,
			user: activity.user,
			friends: activity.friends
		});
	});
});

console.log('Server running at http://127.0.0.1:' + port + '/');


module.exports = app;