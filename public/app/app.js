var app = angular.module('app', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/homeView.html',
    controller: 'homeController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
