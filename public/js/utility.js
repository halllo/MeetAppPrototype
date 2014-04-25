(function() {

  var Utility = function(underscore) {
  	this.underscore = underscore
  };

  Utility.prototype.split = function(s) {
    var csv = s.replace(/\sand\s/g, ", ");
    return this.underscore.map(csv.split(','), function(i) { 
      return i.replace(/^\s+|\s+$/g, "");
    });
  };

  Utility.prototype.withoutId = function(array, id) {
    return this.underscore.filter(array, function(i) {
      return i.id !== id;
    });
  };

  Utility.prototype.today = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'.'+mm+'.'+dd;
    return today;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Utility;
  else
    window.Utility = Utility;

})();