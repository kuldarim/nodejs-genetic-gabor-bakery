var express = require('express');
var request = require('request');

var app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/get-greyscale', (req, res) => {
  // https://github.com/request/request - read more how to make simple http requests
  request('http://localhost:8080/grayscale', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log('response get-greyscale received');
      res.send(response);
    }
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
