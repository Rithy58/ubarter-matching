var db = require('./db.js');
var listing = {};

listing.createListing = function(username, listing, cb) {
  var database = db.getDatabase();
  database.collection('listings').insertOne({
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
        listing: result._id
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
