const fs = require('fs');



const sums = fs.readFileSync('data01.txt').toString('utf8').split("\n\n").map(b => b.split("\n").map(n => parseInt(n, 10)).reduce((s, a) => s + a, 0)).sort((a, b) => a > b ? -1 : 1);

{
	console.log('Result 1', sums[0]);
}


{
	console.log('Result 2', sums[0] + sums[1] + sums[2]);
}