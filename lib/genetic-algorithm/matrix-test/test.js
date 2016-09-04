const genetic = require('genetic');

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
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5]
];

function crossover(parent1, parent2, callback) {
  let child = [
    JSON.parse(JSON.stringify(parent1[0])),
    JSON.parse(JSON.stringify(parent2[1])),
    JSON.parse(JSON.stringify(parent1[2])),
    JSON.parse(JSON.stringify(parent2[3])),
    JSON.parse(JSON.stringify(parent1[4]))
  ];

  callback(child)
}

function mutate(solution, callback) {
  if (Math.random()<0.3) {
    const row = getRandomIntInclusive(0,4);
    solution[row].rowIndex = getRandomIntInclusive(0,4);
    solution[row].indexInRow = getRandomIntInclusive(0,4);
  };

  callback(solution)
}

function getRandomSolution(callback) {
  var solution = [
    { rowIndex: 0, indexInRow: 0 },
    { rowIndex: 1, indexInRow: 1 },
    { rowIndex: 2, indexInRow: 2 },
    { rowIndex: 3, indexInRow: 3 },
    { rowIndex: 4, indexInRow: 4 }
  ]
  callback(solution)
}

function stopCriteria() {
  console.log(this.generation);
  console.log('-------------')
  return (this.generation == 50 || this.statistics && this.statistics.maxScore > 20)
}

function fitness(solution, callback) {
  let sumOfValues = image[solution[0].rowIndex][solution[0].indexInRow]
    + image[solution[1].rowIndex][solution[1].indexInRow]
    + image[solution[2].rowIndex][solution[2].indexInRow]
    + image[solution[3].rowIndex][solution[3].indexInRow]
    + image[solution[4].rowIndex][solution[4].indexInRow];

  callback(sumOfValues);
}

// This example is based on https://github.com/dolphin278/genetic#how-to-use
function run() {
  console.log('=== TEST BEGINS === ');
  const t = new genetic.Task(options);

  t.on('error', function (error) { console.log('ERROR - ', error) })
  t.run(function (stats) { console.log('results', stats)})
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.run = run;