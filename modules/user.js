var db = require('./db.js');
var crypto = require('crypto');
var user = {};

user.createUser = function(username, password) {
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
  var database = db.getDatabase();
  database.collection('users').insertOne({
    _id: username,
    salt: salt,
    hash: hash
  });
};

user.checkPassword = function(username, password) {
  var database = db.getDatabase();
  database.collection('users').findOne({
    _id: username
  }, function(err, doc) {
    if(err) {
      console.log(err);
    }
    var hash = crypto.pbkdf2Sync(password, doc.salt, 1000, 64).toString('hex');
    return doc.hash == hash;
  });
};

module.exports = user;
