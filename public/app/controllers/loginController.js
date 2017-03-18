app.controller('loginController', ['$scope', '$mdDialog', 'authService', '$window', function($scope, $mdDialog, authService, $window) {
  $scope.login = function() {
    authService.login($scope.user).then(function(){
      $window.location.href= '/';
    });
  };
}]);
