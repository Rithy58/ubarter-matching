app.factory('authService', ['$http', '$window', function($http, $window) {
  var auth = {};

  auth.saveToken = function(token) {
    $window.localStorage['token'] = token;
  };

  auth.getToken = function() {
    return $window.localStorage['token'];
  };

  auth.checkLoggedIn = function() {
    var token = auth.getToken();
    var payload;

    if(token) {
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.logout = function() {
    $window.localStorage.removeItem('token');
  };

  auth.register = function(user) {
    return $http.post('/api/auth/register', user).then(function(data) {
      auth.saveToken(data.data.token);
    });
  };

  auth.login = function(user) {
    return $http.post('/api/auth/login', user).then(function(data) {
      auth.saveToken(data.data.token);
    });
  };

  auth.getUser = function() {
    if(auth.checkLoggedIn()){
      var token = auth.getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        username: payload.username
      };
    } else {
      return {
        username: 'Guest'
      };
    }
  };

  return auth;
}]);
