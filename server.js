var express = require('express');
var app = express();
var db = require('./modules/db.js')

app.set('port', process.env.PORT);
app.use(express.static('./public/'));

app.get('/api/', function(req, res) {
  res.send('API Page');
});

var server = app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
  db.init();
});

module.exports = server;
