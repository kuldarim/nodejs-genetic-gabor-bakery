const express = require('express');
const request = require('request');
const cv = require('opencv');

const matHelper = require('./lib/matHelper');
const geneticBasicTest= require('./lib/genetic-algorithm/basic-test/test');
const geneticMatrixTest = require('./lib/genetic-algorithm/matrix-test/test');
const realDataMatrixTest = require('./lib/genetic-algorithm/real-data-test/test');
const statisticsTest = require('./lib/statistics/test');
const chromosome = require('./lib/genetic-algorithm/chromosome/chromosome');

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

app.get('/get-distance', (req, res) => {
  request('http://localhost:8080/distance', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const responseJson = JSON.parse(response.body)
      // const mat = matHelper.convertJsonToMat(responseJson);
      // matHelper.displayMat(mat);

      // // Converting matrix to array
      
      // const rows = responseJson.rows;
      // const pixels = [];
      // for (let i = 0; i < rows; i++) {
      //   pixels.push(mat.row(i));
      // }

      // console.log(pixels);
      console.log(responseJson.length);
      realDataMatrixTest.run(responseJson);

      res.send(responseJson);
    }
  })
});

app.get('/genetic-algorithm/basic-test', (req, res) => {
  geneticBasicTest.run();
  res.send('You deserve a glass of hot red vine. Why? Because I do work without any errors');
});

app.get('/genetic-algorithm/matrix-test', (req, res) => {
  geneticMatrixTest.run();
  res.send('It`s time to rest, I work without any problems');
});

app.get('/statistics/test', (req, res) => {
  statisticsTest.run();
  res.send('Hey man, you are osom');
});

app.get('/test', (req, res) => {
  const c1 = new chromosome(['1-1', '2-2', '3-3', '4-4', '3-1']);
  const c2 = new chromosome(['1-1', '2-2', '3-3', '4-4', '3-1']);
  console.log(c1);
  console.log(c2);
  c1.crossover(c2).printValues();
  c1.mutate().printValues();
  res.send('Hey man, you are osom');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
