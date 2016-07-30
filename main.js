const express = require('express');
const request = require('request');
var cv = require('opencv');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/get-greyscale', (req, res) => {
  // https://github.com/request/request - read more how to make simple http requests
  request('http://localhost:8080/grayscale', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const responseJson = JSON.parse(response.body)
      const mat = convertJsonToMat(responseJson);
      displayMat(mat);
      res.send(responseJson);
    }
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

function convertJsonToMat(jsonObject) {
  const rows = jsonObject.rows;
  const cols = jsonObject.cols;
  const type = jsonObject.type;
  const data = new Buffer(jsonObject.data, 'base64');

  let mat = new cv.Matrix(rows, cols, type);
  mat.put(data);

  return mat;
}

function displayMat(mat) {
  const window = new cv.NamedWindow('Mat-Put', 0);
  window.show(mat);
  window.blockingWaitKey(0, 50);
}
