const jStat = require('jStat').jStat;

function run () {
  console.log(jStat.stdev([1,1,1,1]));
  
  console.log(jStat.stdev([1,2,3,123]));
}

exports.run = run;
