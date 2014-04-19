var mongoose = require('mongoose');

var Activity = require('./Activity')

module.exports = Activities;

function Activities(connection) {
  mongoose.connect(connection);
}

Activities.prototype = {
  
  all: function(callback) {
    Activity.find(function foundActivities(err, items) {
      callback(items);
    });
  },

  create: function(item, callback) {
  	if ( !item 
      || !item.name 
      || !item.location 
      || !item.date 
      || !item.user 
      || !item.friends
      )
  		callback(new Error('Activity not valid'));
  	else
  	{
	  	var newActivitiy = new Activity({
	  		name: item.name,
	  		location: item.location,
	  		date: item.date,
	  		user: item.user,
	  		friends: item.friends
	  	});
	  	newActivitiy.save(function (err, savedActivity) {
	  		callback(err, savedActivity);
	  	});
  	}
  }
}
