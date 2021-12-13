const fs = require('fs');

const data = fs.readFileSync('data_13.txt').toString('utf8').split("\n");



let matrix = {};
let folds = [];
let size_x = size_y = min_x = min_y = 0;

const resetMatrix = () => {
	matrix = {};
	folds = [];
	min_x = 0;
	min_y = 0;
	size_x = 0;
	size_y = 0;
	data.forEach((row, y) => {
		if (row.startsWith('fold along')) {
			const parts = row.split(' ');
			const [axis, size] = parts[2].split('=');
			folds.push({axis: axis, size: parseInt(size, 10)});
		} else if (row) {
			const [x, y] = row.split(',').map(n => parseInt(n, 10));
			matrix[x+','+y] = true;
			size_x = Math.max(size_x, x);
			size_y = Math.max(size_y, y);
		}
	});
}

const visualize = () => {
	for (let y = min_y; y <= size_y; y++) {
		let row = '';
		for (let x = min_x; x <= size_x; x++) {
			row += (matrix[x+','+y] ? '\x1b[1m#' : '\x1b[2m.') + '\x1b[0m';
		}
		console.log(row);
	}
	console.log('');
}

const fold = (fold_def) => {
	if (fold_def.axis === 'y') {
		for (let y = fold_def.size, ty = fold_def.size; y <= size_y; y++, ty--) {
			for (let x = min_x; x <= size_x; x++) {
				if (matrix[x+','+y]) {
					matrix[x+','+ty] = true;
					delete matrix[x+','+y];
					min_y = Math.min(min_y, ty);
				}
			}
		}
		size_y = fold_def.size;
	}
	if (fold_def.axis === 'x') {
		for (let x = fold_def.size, tx = fold_def.size; x <= size_x; x++, tx--) {
			for (let y = min_y; y <= size_y; y++) {
				if (matrix[x+','+y]) {
					matrix[tx+','+y] = true;
					delete matrix[x+','+y];
					min_x = Math.min(min_x, tx);
				}
			}
		}
		size_x = fold_def.size;
	}
}

const count_visible = () => {
	let cnt = 0;
	for (let x = min_x; x <= size_x; x++) {
		for (let y = min_y; y <= size_y; y++) {
			if (matrix[x+','+y]) ++cnt;
		}
	}
	return cnt;
}


{
	let start = Date.now();
	resetMatrix();
	fold(folds[0]);
	console.log('Part 1', count_visible(), Date.now() - start);
}

{
	let start = Date.now();
	resetMatrix();
	folds.forEach(fld => {
		fold(fld);
	});
	visualize();
	console.log('Part 2', Date.now() - start);
}
