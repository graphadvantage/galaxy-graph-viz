var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function (req, res) {

  res.render('index.html', {

  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running on http://localhost:" + app.get('port') + ", CTRL C to quit");
});
