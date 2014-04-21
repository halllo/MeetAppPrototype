function ActivityController($scope) {
  
  var utility = new Utility(_);


  $scope.loginCredentials = {
    username:   '',
    password:   ''
  };

  $scope.loggedin = false;

  $scope.login = function() {
    if ($scope.loginCredentials.username)
    {
      //TODO: load users activities from server
      $scope.loggedin = true;
    }
    else
    {
      alert('Please enter a username');
    }
  };

  $scope.logout = function() {
    $scope.loginCredentials.username = '';
    $scope.loggedin = false;
    //TODO: clear activities from view
  };


  $scope.activities = [
    {
      name:     'watch a movie', 
      location: 'Karlsruhe',
      date:     '2014.04.21',
      friends:  ['Friend1','Friend2']
    }
  ];

  $scope.newActivity = {
    name:     '', 
    location: '',
    date:     '',
    friends:  ''
  };
 
  $scope.addActivity = function() {
    $scope.activities.push({
      name:     $scope.newActivity.name,
      location: $scope.newActivity.location,
      date:     $scope.newActivity.date,
      friends:  utility.split($scope.newActivity.friends)
    });
  
    $scope.newActivity.name = '';
    $scope.newActivity.location = '';
    $scope.newActivity.date = '';
    $scope.newActivity.friends = '';
  };

  $scope.getFriends = function(activity) {
    return activity.friends.join(', ');
  }
}