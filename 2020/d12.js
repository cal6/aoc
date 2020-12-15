const fs = require('fs');
let instructions = fs.readFileSync('input_12.txt').toString().split("\n");

let coords = [0, 0];
let coords_p2 = [0, 0];
let wp = [10, -1];
let heading = 90;
for (let instruction of instructions) {
	let dir = instruction.substr(0, 1);
	const distance = parseInt(instruction.substr(1), 10);
	let steps = distance;
	if (dir === 'R') { heading += distance; steps = 0; }
	if (dir === 'L') { heading -= distance; steps = 0; }
	if (heading < 0) heading += 360;
	if (heading > 270) heading -= 360;
	if (dir === 'N') { coords[1] -= steps; wp[1] -= steps; }
	if (dir === 'S') { coords[1] += steps; wp[1] += steps; }
	if (dir === 'E') { coords[0] += steps; wp[0] += steps; }
	if (dir === 'W') { coords[0] -= steps; wp[0] -= steps; }
	if (dir === 'R' || dir === 'L' || dir === 'F') {
		if (heading === 0) { coords[1] -= steps; }
		if (heading === 180) { coords[1] += steps; }
		if (heading === 90) { coords[0] += steps; }
		if (heading === 270) { coords[0] -= steps; }
	}
	if (dir === 'R') {
		for (let i = 0; i < distance; i += 90) {
			const tmp = wp[1];
			wp[1] = wp[0]; wp[0] = tmp * -1;
		}
	}
	if (dir === 'L') {
		for (let i = 0; i < distance; i += 90) {
			const tmp = wp[1];
			wp[1] = wp[0] * -1; wp[0] = tmp;
		}
	}
	if (dir === 'F') {
		coords_p2[0] += wp[0] * steps;
		coords_p2[1] += wp[1] * steps;
	}
	console.log(dir, distance, heading, steps, coords, coords_p2, wp);
}
console.log('part 1', Math.abs(coords[0]) + Math.abs(coords[1]));
console.log('part 2', Math.abs(coords_p2[0]) + Math.abs(coords_p2[1]));
