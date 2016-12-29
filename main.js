const express = require('express');
const request = require('request');
const cv = require('opencv');

const matHelper = require('./lib/matHelper');
const geneticBasicTest= require('./lib/genetic-algorithm/basic-test/test');
const geneticMatrixTest = require('./lib/genetic-algorithm/matrix-test/test');

const statisticsTest = require('./lib/statistics/test');
const chromosome = require('./lib/genetic-algorithm/chromosome/chromosome');

const geneticMain = require('./lib/genetic-algorithm/main');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/get-distance', (req, res) => {
  request('http://localhost:8080/distance', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const responseJson = JSON.parse(response.body);
      geneticMain.run(responseJson, (data) => {
        request({
          method: 'POST',
          uri: 'http://localhost:8080/store',
          json: JSON.stringify(data)
        }, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            res.send(data)
          }
        })
      });
    }
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
