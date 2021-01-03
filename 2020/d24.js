const fs = require('fs');
let input = fs.readFileSync('input_24.txt').toString().split("\n");

let matrix = new Map();
let min_x = 1e200, min_y = 1e200;
let max_x = -1e200, max_y = -1e200;

const convertCoord = (str) => {
	let x = 0, y = 0;
	while (str) {
		if (str.substr(0, 2) === 'nw') { x += 5; y += 10; str = str.substr(2); }
		else if (str.substr(0, 2) === 'ne') { x -= 5; y += 10; str = str.substr(2); }
		else if (str.substr(0, 2) === 'sw') { x += 5; y -= 10; str = str.substr(2); }
		else if (str.substr(0, 2) === 'se') { x -= 5; y -= 10; str = str.substr(2); }
		else if (str.substr(0, 1) === 'e') { x -= 10; str = str.substr(1); }
		else if (str.substr(0, 1) === 'w') { x += 10; str = str.substr(1); }
	}
	return {x: x, y: y};
}
part1: {
	for (let row of input) {
		const c = convertCoord(row);
		const cs = c.x+','+c.y;
		min_x = Math.min(min_x, c.x); max_x = Math.max(max_x, c.x);
		min_y = Math.min(min_y, c.y); max_y = Math.max(max_y, c.y);
		if (!matrix.get(cs)) matrix.set(cs, true); else matrix.delete(cs);
	}
	console.log('part1', matrix.size);
}

part2: {
	const countNeighbours = (matrix, x, y) => {
		let n = 0;
		if (matrix.get((x-5)+','+(y-10))) ++n;
		if (matrix.get((x+5)+','+(y-10))) ++n;
		if (matrix.get((x-5)+','+(y+10))) ++n;
		if (matrix.get((x+5)+','+(y+10))) ++n;
		if (matrix.get((x-10)+','+(y))) ++n;
		if (matrix.get((x+10)+','+(y))) ++n;
		return n;
	}
	const flopFloor = (matrix) => {
		let new_matrix = new Map(matrix);
		for (let y = min_y; y <= max_y; y += 10) {
			for (let x = min_x; x <= max_x; x += 5) {
				if ((y % 20) !== 0 && (x % 10) === 0) { continue; }
				if ((y % 20) === 0 && (x % 10) !== 0) { continue; }
				const neighbours = countNeighbours(matrix, x, y);
				const c = x+','+y;
				const black = matrix.get(c);
				if (black && (neighbours === 0 || neighbours > 2)) { new_matrix.delete(c); }
				if (!black && neighbours === 2) { new_matrix.set(c, true); }
			}
		}
		return new_matrix;
	}
	for (let i = 1; i <= 100; i++) {
		min_x -= 10; max_x += 10;
		min_y -= 10; max_y += 10;
		matrix = flopFloor(matrix);
	}
	console.log('part 2', matrix.size);
}
