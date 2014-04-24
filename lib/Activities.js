var mongoose = require('mongoose');

var Activity = require('./Activity')

module.exports = Activities;

function Activities(connection) {
  mongoose.connect(connection);
}

Activities.prototype = {
  
  all: function(callback) {
    Activity.find(function activitiesFound(err, items) {
      callback(items);
    });
  },

  ofUser: function(filter, callback) {
    Activity.find(filter, function activitiesFound(err, items) {
      callback(items);
    })
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
      newActivitiy.save(function activityCreated(err, savedActivity) {
        callback(err, savedActivity);
      });
    }
  },

  delete: function(id, callback) {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(id))
      callback(new Error('Activity ID not valid'));
    else
    {
      Activity.findByIdAndRemove(id, function activityDeleted(err, deletedActivity) {
        callback(err, deletedActivity);
      }); 
    }
  }
}
