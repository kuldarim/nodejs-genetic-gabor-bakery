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

function crossover(parent1, parent2, callback) {
  var child = {}
  if (Math.random()>0.5) {
    child.a = parent1.a    
  }
  else {
    child.a = parent2.a
  }
  if (Math.random()>0.5) {
    child.b = parent1.b
  }
  else {
    child.b = parent2.b
  }
  if (Math.random()>0.5) {
    child.c = parent1.c
  }
  else {
    child.c = parent2.c
  }
  callback(child)
}

function mutate(solution, callback) {
  if (Math.random()<0.3) {
    solution.a = Math.random()
  }
  if (Math.random()<0.3) {
    solution.b = Math.random()
  }
  if (Math.random()<0.3) {
    solution.c = Math.random()
  }
  callback(solution)
}

function getRandomSolution(callback) {
  var solution = { a: Math.random(), b: Math.random(), c: Math.random() }
  callback(solution)
}

function stopCriteria() {
  return (this.generation == 1000)
}

function fitness(solution, callback) {
  callback(Math.pow(solution.a,2)+solution.b+solution.c)
}

// This example is based on https://github.com/dolphin278/genetic#how-to-use
function run() {
  console.log('=== TEST BEGINS === ');
  const t = new genetic.Task(options);

  t.on('error', function (error) { console.log('ERROR - ', error) })
  t.run(function (stats) { console.log('results', stats)})
}

exports.run = run;
