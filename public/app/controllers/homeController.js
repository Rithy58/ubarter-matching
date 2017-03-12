app.controller('homeController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  $scope.toggleSidenav = function() {
    $mdSidenav('sidenav').toggle();
  };
}]);
