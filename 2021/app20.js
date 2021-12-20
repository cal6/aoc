const fs = require('fs');

const visualize = (hideoutput = false) => {
	let count = 0;
	for (let y = min_y; y <= size_y; y++) {
		let row = '';
		for (let x = min_x; x <= size_x; x++) {
			row += (matrix[x+','+y] ? '\x1b[1m#' : '\x1b[2m.') + '\x1b[0m';
			if (matrix[x+','+y]) ++count;
		}
		if (!hideoutput) console.log(row);
	}
	if (!hideoutput) console.log('');
	return count;
}

let rules = [];
let matrix = {};
let min_x = 0;
let min_y = 0;
let size_x = 0;
let size_y = 0;

const resetMatrix = () => {

	matrix = {};
	min_x = 0;
	min_y = 0;
	size_x = 0;
	size_y = 0;

	const data = fs.readFileSync('data_20.txt').toString('utf8').split("\n");
	rules = data.shift().split('');
	data.shift();

	data.forEach((row, y) => {
		row.split('').forEach((n, x) => {
			if (n === '#') matrix[x+','+y] = true;
			size_x = Math.max(size_x, x);
		});
		size_y = Math.max(size_y, y);
	});

}

const getbyte = (x, y) => {
	let byte = '';
	for (let yy = y-1; yy <= y+1; yy++) {
		for (let xx = x-1; xx <= x+1; xx++) {
			byte += matrix[xx+','+yy] ? '1' : '0';
		}
	}
	return rules[parseInt(byte, 2)] === '#';
}

{

	let start = Date.now();
	resetMatrix();
	let sum = 0;
	visualize(true);
	min_x -= 100; min_y -= 100; size_x += 100; size_y += 100;
	for (let coef = 1; coef <= 2; coef++) {
		let nmatrix = [];
		for (let y = min_y; y <= size_y; y++) {
			for (let x = min_x; x <= size_x; x++) {
				if (getbyte(x, y)) { nmatrix[x+','+y] = true; }
			}
		}
		matrix = nmatrix;
	}
	min_x += 90; min_y += 90; size_x -= 90; size_y -= 90;
	sum = visualize(true);
	console.log('Part 1', sum, Date.now() - start);
}

{
	let start = Date.now();
	resetMatrix();
	let sum = 0;
	visualize();
	min_x -= 1000; min_y -= 1000; size_x += 1000; size_y += 1000;
	for (let coef = 1; coef <= 50; coef++) {
		let nmatrix = [];
		for (let y = min_y; y <= size_y; y++) {
			for (let x = min_x; x <= size_x; x++) {
				if (getbyte(x, y)) { nmatrix[x+','+y] = true; }
			}
		}
		matrix = nmatrix;
	}
	min_x += 900; min_y += 900; size_x -= 900; size_y -= 900;
	sum = visualize(true);
	console.log('Part 2', sum, Date.now() - start);
}
