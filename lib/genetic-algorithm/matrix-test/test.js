const genetic = require('genetic');
const number = require('../../number');
const object = require('../../object');
const jStat = require('jStat').jStat;

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
  [1,5,5,5,5],
  [5,5,5,5,5],
  [5,5,5,5,5],
  [5,5,5,5,5],
  [9,5,5,5,5]
];

const FIRST_INDEX = 0;
const LAST_INDEX = 4;

function crossover(parent1, parent2, callback) {
  let child = [[
      parent1[0][0],
      parent2[0][1],
      parent1[0][2],
      parent2[0][3],
      parent1[0][4]
    ], [
      parent2[1][0],
      parent1[1][1],
      parent2[1][2],
      parent1[1][3],
      parent2[1][4]
    ]
  ];

  callback(child)
}

function mutate(solution, callback) {
  const row = number.getRandomIntInclusive(FIRST_INDEX, LAST_INDEX);
  const column = number.getRandomIntInclusive(FIRST_INDEX, LAST_INDEX);
  solution[0][row] = number.getRandomIntInclusive(FIRST_INDEX, LAST_INDEX);
  solution[1][column] = number.getRandomIntInclusive(FIRST_INDEX, LAST_INDEX);

  callback(solution)
}

function getRandomSolution(callback) {
  // [row_index, index_in_row]
  var solution = [[0, 1, 2, 3, 4], [1, 0, 3, 1, 4]];
  callback(solution);
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
  const rowIndexes = solution[0];
  const columnIndexes = solution[1];

  for (let i = 0; i < rowIndexes.length; i++) {
    values.push(image[rowIndexes[i]][columnIndexes[i]]);
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
