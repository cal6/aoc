const fs = require('fs');

const data = fs.readFileSync('data_11.txt').toString('utf8').split("\n");



let matrix = {};
let size_x = 0;
let size_y = 0;

const resetMatrix = () => {
	matrix = {};
	size_x = 0;
	size_y = 0;
	data.forEach((row, y) => {
		row.split('').forEach((n, x) => {
			matrix[x+','+y] = parseInt(n, 10);
			size_x = Math.max(size_x, x);
		});
		size_y = Math.max(size_y, y);
	});
}

const visualize = () => {
	for (let y = 0; y <= size_y; y++) {
		let row = '';
		for (let x = 0; x <= size_x; x++) {
			row += (matrix[x+','+y] === 0 ? '\x1b[1m' : '\x1b[2m') + (matrix[x+','+y] + '\x1b[0m');
		}
		console.log(row);
	}
	console.log('');
}

const isZero = () => {
	return Object.values(matrix).reduce((partial_sum, a) => partial_sum + a, 0);
}

const flash = (o_x, o_y, flashed) => {
	let flashes = 0;
	if (flashed[o_x+','+o_y]) return flashes;
	++matrix[o_x+','+o_y]
	if (matrix[o_x+','+o_y] === 10) {
		flashed[o_x+','+o_y] = true;
		matrix[o_x+','+o_y] = 0;
		++flashes;
		for (let x = o_x-1; x <= o_x+1; x++) {
			if (x < 0 || x > size_x) continue;
			for (let y = o_y-1; y <= o_y+1; y++) {
				if (y < 0 || y > size_y) continue;
				flashes += flash(x, y, flashed);
			}
		}
	}
	return flashes;
}


{
	let start = Date.now();
	resetMatrix();
	let flashes = 0;
	for (let day = 0; day < 100; day++) {
		let flashed = {};
		for (let y = 0; y <= size_y; y++) {
			for (let x = 0; x <= size_x; x++) {
				flashes += flash(x, y, flashed);
			}
		}
	}
	console.log('Part 1', flashes, Date.now() - start);
}


{
	let start = Date.now();
	resetMatrix();
	let moves = 0;
	while (true) {
		let flashed = {};
		for (let y = 0; y <= size_y; y++) {
			for (let x = 0; x <= size_x; x++) {
				flash(x, y, flashed);
			}
		}
		++moves;
		let sum = isZero();
		if (sum === 0) break;
	}
	console.log('Part 2', moves, Date.now() - start);
}
