function Utility(_){
	split = function(s){
		var csv = s.replace(/\sand\s/g, ", ");
		return _.map(csv.split(','), function(i){ 
			return i.replace(/^\s+|\s+$/g, "")
		});
	} 
}
