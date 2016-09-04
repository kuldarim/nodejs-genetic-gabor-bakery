const express = require('express');
const request = require('request');
const cv = require('opencv');

const matHelper = require('./lib/matHelper');
const geneticAlgoritmTest= require('./lib/genetic-algorithm-test');

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

app.get('/get-greyscale-console-output', (req, res) => {
  request('http://localhost:8080/grayscale', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const responseJson = JSON.parse(response.body)
      const mat = matHelper.convertJsonToMat(responseJson);
      matHelper.displayMat(mat);

      // Converting matrix to array
      
      const rows = responseJson.rows;
      const pixels = [];
      for (let i = 0; i < rows; i++) {
        pixels.push(mat.row(i));
      }

      console.log(pixels);

      res.send(responseJson);
    }
  })
});

app.get('/genetic-algoritm-test', (req, res) => {
  geneticAlgoritmTest.runTest();
  res.send('You deserve a glass of hot red vine. Why? Because I do work without any errors');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
