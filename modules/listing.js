var db = require('./db.js');
var listing = {};

listing.createListing = function(username, listing, cb) {
  var database = db.getDatabase();
  var ObjectID = require('mongodb').ObjectID;
  var id = new ObjectID();
  database.collection('listings').insertOne({
    _id: id.toHexString(),
    owner: username,
    listing: listing
  }, function(err, result) {
    if(err) {
      console.log(err);
    }
    database.collection('users').updateOne({
      _id: username
    }, {
      $push: {
        listing: id.toHexString()
      }
    }, function(err, result) {
      if(err) {
        console.log(err);
      }
      cb(result);
    });
  });
};

module.exports = listing;
