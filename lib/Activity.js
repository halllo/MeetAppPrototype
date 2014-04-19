var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  
    name      : String
  , location  : String
  , date      : { type: Date, default: Date.now }
  
  , user      : String
  , friends   : { type : Array , "default" : [] }
  
});

module.exports = mongoose.model('ActivityModel', ActivitySchema);