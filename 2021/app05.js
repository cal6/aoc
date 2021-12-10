const fs = require('fs');

const data = fs.readFileSync('data_05.txt').toString('utf8').split("\n").map(n => n.trim());

{
	let start = Date.now();
	let matrix = [];
	let min_x = min_y = 1e200;
	let max_x = max_y = -1e200;
	data.forEach(row => {
		const [p1, p2] = row.split(' -> ');
		const [p1_x, p1_y] = p1.split(',').map(n => parseInt(n, 10));
		const [p2_x, p2_y] = p2.split(',').map(n => parseInt(n, 10));
		if (p1_x !== p2_x && p1_y !== p2_y) return;
		min_x = Math.min(p1_x, p2_x, min_x);
		min_y = Math.min(p1_y, p2_y, min_y);
		max_x = Math.max(p1_x, p2_x, max_x);
		max_y = Math.max(p1_y, p2_y, max_y);
		for (let x = Math.min(p1_x, p2_x); x <= Math.max(p1_x, p2_x); x++) {
			for (let y = Math.min(p1_y, p2_y); y <= Math.max(p1_y, p2_y); y++) {
				matrix[x+','+y] = matrix[x+','+y] ? ++matrix[x+','+y] : 1;
			}
		}
	});
	let dangerous = 0;
	for (let k in matrix) {
		if (matrix[k] > 1) ++dangerous;
	}
	console.log('Part 1', dangerous, Date.now()-start)
}

{
	let start = Date.now();
	let matrix = [];
	let min_x = min_y = 1e200;
	let max_x = max_y = -1e200;

	const drawmatrix = () => {
		for (let y = min_y; y <= max_y; y++) {
			let row = '';
			for (let x = min_x; x <= max_x; x++) {
				row += matrix[x+','+y] ? matrix[x+','+y] : '.';
			}
			console.log(row);
		}
	}

	data.forEach(row => {
		const [p1, p2] = row.split(' -> ');
		const [p1_x, p1_y] = p1.split(',').map(n => parseInt(n, 10));
		const [p2_x, p2_y] = p2.split(',').map(n => parseInt(n, 10));
		min_x = Math.min(p1_x, p2_x, min_x);
		min_y = Math.min(p1_y, p2_y, min_y);
		max_x = Math.max(p1_x, p2_x, max_x);
		max_y = Math.max(p1_y, p2_y, max_y);
		if (p1_x === p2_x || p1_y === p2_y) { // Horisontal
			for (let x = Math.min(p1_x, p2_x); x <= Math.max(p1_x, p2_x); x++) {
				for (let y = Math.min(p1_y, p2_y); y <= Math.max(p1_y, p2_y); y++) {
					matrix[x+','+y] = matrix[x+','+y] ? ++matrix[x+','+y] : 1;
				}
			}
		} else { // Diagonal
			let x = p1_x, y = p1_y;
			while (true) {
				matrix[x+','+y] = matrix[x+','+y] ? ++matrix[x+','+y] : 1;
				if (x === p2_x && y === p2_y) break;
				if (p2_x > p1_x) x++; else x--;
				if (p2_y > p1_y) y++; else y--;
			}
		}
	});
	let dangerous = 0;
	for (let k in matrix) {
		if (matrix[k] > 1) ++dangerous;
	}
	console.log('Part 2', dangerous, Date.now()-start)
}