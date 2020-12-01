const fs = require('fs');
const instructions = fs.readFileSync('input_d06.txt').toString().split("\n");

let grid = {};
for (let x = 0; x < 1000; x++) {
	for (let y = 0; y < 1000; y++) {
		grid[x+'x'+y] = 0;
	}
}

for (const instruction of instructions) {
	console.log(instruction)
	const parts = instruction.split(' ');
	if (parts[0] === 'turn') {
		const newval = parts[1] === 'on' ? 1 : -1;
		const start = parts[2].split(',').map(a => parseInt(a, 10));
		const end = parts[4].split(',').map(a => parseInt(a, 10));
		for (let x = start[0]; x <= end[0]; x++) {
			for (let y = start[1]; y <= end[1]; y++) {
				grid[x+'x'+y] += newval;
				grid[x+'x'+y] = Math.max(grid[x+'x'+y], 0);
			}
		}
	}
	if (parts[0] === 'toggle') {
		const start = parts[1].split(',').map(a => parseInt(a, 10));
		const end = parts[3].split(',').map(a => parseInt(a, 10));
		for (let x = start[0]; x <= end[0]; x++) {
			for (let y = start[1]; y <= end[1]; y++) {
				grid[x+'x'+y] += 2;
			}
		}
	}
}
let turned_on = 0;
let brightness = 0;
for (const coord in grid) {
	if (grid[coord]) {
		++turned_on;
		brightness += grid[coord];
	}
}
console.log(turned_on, brightness);
