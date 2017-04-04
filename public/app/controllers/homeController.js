app.controller('homeController', ['$scope', 'authService', '$window', function($scope, authService, $window) {
  $scope.loggedIn = authService.checkLoggedIn();
  $scope.username = authService.getUser().username;
  $scope.token = authService.getToken();
  $scope.login = function() {
    authService.login($scope.user).then(function(){
      $window.location.href= '/';
    });
  };
}]);
