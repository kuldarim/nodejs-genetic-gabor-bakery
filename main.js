var express = require('express');
var request = require('request');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/get-greyscale', function (req, res) {
  // https://github.com/request/request - read more how to make simple http requests
  request('http://localhost:8080/grayscale', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('response get-greyscale received');
    res.send(response);
  }
})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
