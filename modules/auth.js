var auth = require('passport');
var Strategy = require('passport-local').Strategy;
var user = require('./user.js');

auth.use(new Strategy(
  function(username, password, cb) {
    //console.log(user.checkPassword(username, password));
    user.checkPassword(username, password, function(check) {
      if(check) {
        return cb(null, username);
      } else {
        return cb(null, false, {message: 'Incorrect Login Info'});
      }
    });
}));

module.exports = auth;
