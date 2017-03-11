var express = require('express');
var app = express();

app.set('port', 8080);
app.use(express.static('./public/'));

app.get('/api/', function(req, res) {
  res.send('API Page');
});

var server = app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

module.exports = server;
