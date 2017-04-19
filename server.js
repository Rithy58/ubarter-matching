var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('express-jwt')({
  secret: process.env.JWT_SECRET,
  userProperty: 'jwt'
});
var db = require('./modules/db.js');
var auth = require('./modules/auth.js');
var user = require('./modules/user.js');
var listing = require('./modules/listing.js');

app.set('port', process.env.PORT);
app.use(express.static('./public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(auth.initialize());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.get('/api/', function(req, res) {
  res.send('API Page');
});

app.post('/api/auth/login',
  auth.authenticate('local', { session: false }),
  function(req, res) {
    var token = user.generateJWT(req.body.username);
    res.json({token: token});
  }
);

app.post('/api/auth/register', function(req, res) {
  user.createUser(req.body.username, req.body.password, function(result) {
    var token = user.generateJWT(req.body.username);
    res.json({token: token});
  });
});

app.post('/api/listing/create', jwt, function(req, res) {
  listing.createListing(req.jwt.username, {item: "test", has: 2}, function(result){
    res.json(result);
  });
  //res.json({token: req.jwt});
});

var server = app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
  db.init();
});

module.exports = server;
