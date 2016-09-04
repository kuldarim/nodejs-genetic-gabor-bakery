// Creates a copy of object
function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

exports.clone = clone;
