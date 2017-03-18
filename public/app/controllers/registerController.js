app.controller('registerController', ['$scope', '$mdDialog', 'authService', '$window', function($scope, $mdDialog, authService, $window) {
  $scope.register = function() {
    authService.register($scope.user).then(function(){
      $window.location.href= '/';
    });
  };
}]);
