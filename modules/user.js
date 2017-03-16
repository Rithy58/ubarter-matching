var db = require('./db.js');
var crypto = require('crypto');
var user = {};

user.createUser = function(username, password, cb) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
  var database = db.getDatabase();
  database.collection('users').insertOne({
    _id: username,
    salt: salt,
    hash: hash
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    cb(result);
  });
};

user.checkPassword = function(username, password, cb) {
  var database = db.getDatabase();
  database.collection('users').findOne({
    _id: username
  }, function(err, doc) {
    if(err) {
      console.log(err);
    }
    if(doc) {
      var hash = crypto.pbkdf2Sync(password, doc.salt, 1000, 64, 'sha1').toString('hex');
      cb(doc.hash == hash);
    } else {
      cb(false);
    }
  });
};

module.exports = user;
