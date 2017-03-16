var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./modules/db.js');
var auth = require('./modules/auth.js');
var user = require('./modules/user.js');

app.set('port', process.env.PORT);
app.use(express.static('./public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(auth.initialize());

app.get('/api/', function(req, res) {
  res.send('API Page');
});

app.post('/api/auth/login',
  auth.authenticate('local', { session: false }),
  function(req, res) {
    res.json({ id: req.user, username: req.username });
  }
);

app.post('/api/auth/register', function(req, res) {
  user.createUser(req.body.username, req.body.password, function(result) {
    res.json(result);
  });
});

var server = app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
  db.init();
});

module.exports = server;
