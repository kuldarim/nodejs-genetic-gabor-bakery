const genetic = require('genetic');
const number = require('../../number');
const object = require('../../object');
const jStat = require('jStat').jStat;
const chromosome = require('../chromosome/chromosome');

// TODO there is a bug now, same values should not be allowed here

const options = {
  getRandomSolution: getRandomSolution,
  popSize: 500,
  stopCriteria: stopCriteria,
  fitness: fitness,
  minimize: false,
  mutateProbability: 0.1,
  mutate: mutate,
  crossoverProbability: 0.3,
  crossover: crossover
}

const image = [
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
];

function crossover(parent1, parent2, callback) {
  callback(parent1.crossover(parent2));
}

function mutate(solution, callback) {
  callback(solution.mutate())
}

function getRandomSolution(callback) {
  callback(new chromosome(['0-0', '2-2', '3-1', '4-4', '4-0']));
}

function stopCriteria() {
  console.log(this.generation);
  console.log('-------------')
  return (this.generation == 100 /*|| this.statistics && this.statistics.maxScore > 20*/)
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

  for (let i = 0; i < solutionValues.length; i++) {
    const split = solutionValues[i].split('-');
    values.push(image[split[0]][split[1]]);
  }

  return values;
}

// This example is based on https://github.com/dolphin278/genetic#how-to-use
function run() {
  console.log('=== TEST BEGINS === ');
  const t = new genetic.Task(options);

  t.on('error', function (error) { console.log('ERROR - ', error) })
  t.run(function (stats) { 
    console.log('results', stats)
    const solutionValues = getValuesFromSolution(stats.max);
    console.log('best values', solutionValues);
  })
}

exports.run = run;
