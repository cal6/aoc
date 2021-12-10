const fs = require('fs');

const data = fs.readFileSync('data_01.txt').toString('utf8').split("\n").map(n => parseInt(n, 10));

let bigger = 0;
let p = false;
data.forEach(num => {
	if (p !== false && num > p) ++bigger;
	console.log(p, num, bigger);
	p = num
});
console.log('Bigger 1', bigger);


bigger = 0;
p = false;
for (let i = 3; i < data.length; i++) {
	let sum1 = data[i-3] + data[i-2] + data[i-1]
	let sum2 = data[i-2] + data[i-1] + data[i]
	if (sum2 > sum1) ++bigger;
}
console.log('Bigger 2', bigger);