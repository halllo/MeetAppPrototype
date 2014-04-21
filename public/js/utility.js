(function() {

  var Utility = function(underscore) {
  	this.underscore = underscore
  };

  Utility.prototype.split = function(s){
	var csv = s.replace(/\sand\s/g, ", ");
	return this.underscore.map(csv.split(','), function(i){ 
		return i.replace(/^\s+|\s+$/g, "")
	});
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Utility;
  else
    window.Utility = Utility;

})();