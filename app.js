var express = require('express');
var app = express();
var _ = require('underscore');
var Activities = require('./lib/Activities');


var mongourl = require('./data/mongodburl').generate();
var port = process.env.VMC_APP_PORT || process.env.PORT || 1337

var activities = new Activities(mongourl);

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(app.router);
});
app.listen(port);

app.get('/users/:user/activities', function(req, res){
	var response = res;
	var user = req.params.user
	activities.ofUser({ user: user }, function (items){
		response.send(200, {
			activities: _.map(items, function(item) {
				return {
					id: item.id,
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

app.get('/activities', function(req, res){
	var response = res;
	activities.all(function (items){
		response.send(200, {
			activities: _.map(items, function(item) {
				return {
					id: item.id,
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
			id: activity.id,
			name: activity.name,
			location: activity.location,
			date: activity.date,
			user: activity.user,
			friends: activity.friends
		});
	});
});

app.del('/activities/:id', function(req, res){
	var response = res;
	var id = req.params.id;
				
	activities.delete(id, function (err, activity) {
		if (err) response.send(404, err.message);
		else response.send(200, { id: id });
	});
});

console.log('Server running at http://127.0.0.1:' + port + '/');


module.exports = app;