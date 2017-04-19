app.controller('createController', ['$scope', 'authService', '$window', function($scope, authService, $window) {
  $scope.loggedin = authService.checkLoggedIn();
  if(!$scope.loggedin) {
    $window.location.href= '/';
  }
}]);
