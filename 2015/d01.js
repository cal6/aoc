const fs = require('fs');
const instructions = fs.readFileSync('input_d01.txt').toString();
let floor = 0;
for (let i = 0; i < instructions.length; i++) {
	//console.log(floor, i);
	const p = instructions[i];
	if (p === '(') ++floor;
	if (p === ')') --floor;
	if (floor === -1) console.log(floor, (i+1));
}
console.log(floor);