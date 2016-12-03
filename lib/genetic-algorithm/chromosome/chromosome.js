const number = require('../../number');
const lodash = require('lodash');

function chromosome(values, x, y) {
  this.values = values;
  this.min = 0;
  this.max = values.length - 1;
  // TODO don't hard code the value
  console.log('@constructor ', x + ' ' + y);
  this.x = x;
  this.y = y;
}

chromosome.prototype.crossover = function(parent1) {
  let child = undefined;
  if (Math.random() > 0.5) {
    child = lodash
      // Merge arrays and take unique values from them
      .uniq([...this.values, ...parent1.values])
      // Sort the values
      .sort()
      .reverse()
      // Take only the length wanted
      .slice(0, this.max + 1);
  } else {
    child = lodash
      // Merge arrays and take unique values from them
      .uniq([...this.values, ...parent1.values])
      // Sort the values
      .sort()
      // Take only the length wanted
      .slice(0, this.max + 1);
  }

  return new chromosome(child, this.x, this.y);
}

chromosome.prototype.mutate = function() {
  console.log('@mutate ', this)
  const row = number.getRandomIntInclusive(this.min, this.x);
  const index = number.getRandomIntInclusive(this.min, this.y);
  const randomValue = row + '-' + index;

  console.log('@mutate ', row + ' ' + index);
  const values = [...this.values];
  // TODO maybe should random on values which are not existing yet
  values.push(randomValue);
  return new chromosome(lodash.uniq(values).sort().slice(0, this.max + 1), this.x, this.y);
}

chromosome.prototype.printValues = function() {
  for (let item of this.values) console.log(item);
  console.log('----');
}

module.exports = chromosome;
