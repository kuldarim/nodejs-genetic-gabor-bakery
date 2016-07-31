const cv = require('opencv');

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

exports.convertJsonToMat = convertJsonToMat;
exports.displayMat = displayMat;
