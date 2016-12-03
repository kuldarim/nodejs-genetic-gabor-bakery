const genetic = require('genetic');
const number = require('../number');
const object = require('../object');
const jStat = require('jStat').jStat;
const chromosome = require('./chromosome/chromosome');

// TODO there is a bug now, same values should not be allowed here

const options = {
  getRandomSolution: getRandomSolution,
  popSize: 15,
  stopCriteria: stopCriteria,
  fitness: fitness,
  minimize: false,
  mutateProbability: 0.5,
  mutate: mutate,
  crossoverProbability: 0.3,
  crossover: crossover
}

let image = [];

function crossover(parent1, parent2, callback) {
  callback(parent1.crossover(parent2));
}

function mutate(solution, callback) {
  callback(solution.mutate())
}

function getRandomSolution(callback) {
  const x = image.length - 1;
  const y = image[0].length - 1;
  let values = [];

  for (let i = 0; i < 40; i++) {
    values.push(getRandomInt(0, x) + '-' + getRandomInt(0, y));
  }
  callback(new chromosome(values, x, y));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function stopCriteria() {
  console.log(this.generation);
  console.log('-------------')
  return (this.generation == 10 /*|| this.statistics && this.statistics.maxScore > 20*/)
}

// Standard deviation of values selected is our fitness
function fitness(solution, callback) {
  const values = getValuesFromSolution(solution);
  const standardDeviation  = jStat.stdev(values);

  callback(standardDeviation);
}

function getValuesFromSolution(solution) {
  let values = [];
  const solutionValues = solution.values;

  //console.log(solutionValues);

  for (let i = 0; i < solutionValues.length; i++) {
    const split = solutionValues[i].split('-');
    values.push(image[split[0]][split[1]]);
  }

  return values;
}

// This example is based on https://github.com/dolphin278/genetic#how-to-use
function run(_image, callback) {
  console.log('=== TEST BEGINS === ');
  const t = new genetic.Task(options);

  image = _image;

  t.on('error', function (error) { console.log('ERROR - ', error) })
  t.run(function (stats) { 
    console.log('results', stats)
    const solutionValues = getValuesFromSolution(stats.max);
    console.log('best values', solutionValues);
    callback({ stats, solutionValues });
  })
}

exports.run = run;
