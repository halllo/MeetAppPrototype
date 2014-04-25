function ActivityController($scope, $http) {
  
  var utility = new Utility(_);


  $scope.loginCredentials = {
    username:   '',
    password:   ''
  };

  $scope.loggedin = false;

  $scope.login = function() {
    if ($scope.loginCredentials.username)
    {
      $scope.activities = [];
      $scope.loggedin = true;
      $http.get('users/' + $scope.loginCredentials.username + '/activities/').
        success(function(data) {
            if ($scope.loggedin)
              $scope.activities = data.activities;
        });
    }
    else
    {
      alert('Please enter a username');
    }
  };

  $scope.logout = function() {
    $scope.loginCredentials.username = '';
    $scope.loggedin = false;
    $scope.activities = [];
  };


  $scope.activities = [];

  $scope.newActivity = {
    name:     '', 
    location: '',
    date:     '',
    friends:  ''
  };
 
  $scope.addActivity = function() {
    var newActivity = {
      name:     $scope.newActivity.name,
      location: $scope.newActivity.location,
      date:     $scope.newActivity.date,
      user:     $scope.loginCredentials.username,
      friends:  utility.split($scope.newActivity.friends)
    };
    $http.put('activities/', newActivity).
        success(function(savedActivity) {
            if ($scope.loggedin) 
            {
              $scope.activities.push(savedActivity);
              $scope.newActivity.name = '';
              $scope.newActivity.location = '';
              $scope.newActivity.date = '';
              $scope.newActivity.friends = '';
            }
        }).error(function (data) {
          alert(data);
        });;
  };

  $scope.deleteActivity = function(activity) {
    $http.delete('activities/' + activity.id).
        success(function(deletedActivity) {
          if ($scope.loggedin)
            $scope.activities = utility.withoutId($scope.activities, deletedActivity.id);
        }).error(function (data) {
          alert(data);
        });
  }

  $scope.getFriends = function(activity) {
    return activity.friends.join(', ');
  }

  $scope.today = utility.today();
}