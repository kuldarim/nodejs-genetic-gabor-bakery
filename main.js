const express = require('express');
const request = require('request');
const cv = require('opencv');

const matHelper = require('./libs/matHelper');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/get-greyscale', (req, res) => {
  // https://github.com/request/request - read more how to make simple http requests
  request('http://localhost:8080/grayscale', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const responseJson = JSON.parse(response.body)
      const mat = matHelper.convertJsonToMat(responseJson);
      matHelper.displayMat(mat);
      res.send(responseJson);
    }
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
