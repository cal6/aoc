const fs = require('fs');
const instructions = fs.readFileSync('input_d03.txt').toString();

let houses = 1;
let visited = {'0x0': 1};
let coords = [[0, 0], [0, 0]];

for (const i in instructions) {
	const instruction = instructions[i];
	const mod = (i % 2) === 1 ? 0 : 1;
	// const mod = 0;
	if (instruction === '>') ++coords[mod][0];
	if (instruction === '<') --coords[mod][0];
	if (instruction === '^') ++coords[mod][1];
	if (instruction === 'v') --coords[mod][1];
	const newcoord = coords[mod][0]+'x'+coords[mod][1];
	if (!visited[newcoord]) {
		++houses;
		visited[newcoord] = 1;
	} else {
		++visited[newcoord];
	}
}
console.log(houses);
