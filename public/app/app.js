var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/homeView.html',
    controller: 'homeController'
  })
  .when('/create', {
    templateUrl: 'app/views/createView.html',
    controller: 'createController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
