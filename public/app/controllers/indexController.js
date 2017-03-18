app.controller('indexController', ['$scope', '$mdSidenav', 'authService', '$window', '$mdDialog', function($scope, $mdSidenav, authService, $window, $mdDialog) {
  $scope.toggleSidenav = function() {
    $mdSidenav('sidenav').toggle();
  };
  $scope.loggedIn = authService.checkLoggedIn();
  $scope.logout = function() {
    authService.logout();
    $scope.loggedIn = authService.checkLoggedIn();
    $window.location.href= '/';
  };

  $scope.showLogin = function(ev) {
    $mdDialog.show({
      controller: 'loginController',
      templateUrl: 'app/views/loginView.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      openFrom: '#loginButton',
      closeTo: '#loginButton'
    })
    .then(function() {
      //Function success
    }, function() {
      //Dialog cancelled
    });
  };

  $scope.showRegister = function(ev) {
    $mdDialog.show({
      controller: 'registerController',
      templateUrl: 'app/views/registerView.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      openFrom: '#registerButton',
      closeTo: '#registerButton'
    })
    .then(function() {
      //Function success
    }, function() {
      //Dialog cancelled
    });
  };

}]);
