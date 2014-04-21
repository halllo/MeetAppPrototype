function ActivityController($scope) {
  $scope.activities = [
    {
      name:'learn angular', 
      location:'Karlsruhe',
      date:'2014.04.21',
      friends:'friend1, friend2'
    }
  ];

  $scope.newActivity = {
    name:'', 
    location:'',
    date:'',
    friends:''
  };
 
  $scope.addActivity = function() {
    $scope.activities.push({
      name:$scope.newActivity.name,
      location:$scope.newActivity.location,
      date:$scope.newActivity.date,
      friends:$scope.newActivity.friends
    });
  
    $scope.newActivity.name = '';
    $scope.newActivity.location = '';
    $scope.newActivity.date = '';
    $scope.newActivity.friends = '';
  };
 
}