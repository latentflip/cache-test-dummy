var express = require('express');
var app = express();

var version = 1;
//rand ensures we refresh after server start
var rand = Math.random();


app.get('/bump-version', function(req, res) {
  res.send("<html><head><body>Html version: " + version + "<form method=POST action=/bump-version><button type=submit>Increase version</button></body></html>");
});

app.post('/bump-version', function (req, res) {
  version++
  if (version > 1000) {
    version = 0
  }
  res.redirect('/bump-version')
});

app.get('/', function(req, res) {
  var headers = {
    "Cache-Control" :"public, max-age=31536000",
    "ETag": "version-" + version + "-rand",
  };
  res.set(headers)
     .send("<html><head></head><body>Html version: " + version + "<script src='/script-tag.js'></script></body></html>")
});

app.get('/script-tag.js', function(req, res) {
  var headers = {
    "Cache-Control" :"public, max-age=31536000",
    "ETag": "version-" + version + "-rand",
  };
  res.set(headers)
     .send("document.body.innerHTML += '<br>Script version: " + version + "'")
});

var server = app.listen(process.env.PORT || 3999, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
