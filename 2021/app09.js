const fs = require('fs');

const data = fs.readFileSync('data_09.txt').toString('utf8').split("\n");



let matrix = {};
let size_x = 0;
let size_y = 0;
data.forEach((row, y) => {
	row.split('').forEach((n, x) => {
		matrix[x+','+y] = parseInt(n, 10);
		size_x = Math.max(size_x, x);
	});
	size_y = Math.max(size_y, y);
});

const hasSmallNeighbour = (x, y) => {
	const val = matrix[x+','+y];
	if (typeof matrix[(x)+','+(y-1)] !== undefined && matrix[(x)+','+(y-1)] <= val) return matrix[(x)+','+(y-1)];
	if (typeof matrix[(x)+','+(y+1)] !== undefined && matrix[(x)+','+(y+1)] <= val) return matrix[(x)+','+(y+1)];
	if (typeof matrix[(x+1)+','+(y)] !== undefined && matrix[(x+1)+','+(y)] <= val) return matrix[(x+1)+','+(y)];
	if (typeof matrix[(x-1)+','+(y)] !== undefined && matrix[(x-1)+','+(y)] <= val) return matrix[(x-1)+','+(y)];
	return false;
}

{
	let start = Date.now();
	let risk_points_sum = 0;
	for (let x = 0; x <= size_x; x++) {
		for (let y = 0; y <= size_y; y++) {
			let smaller = hasSmallNeighbour(x, y, matrix);
			if (smaller === false) {
				risk_points_sum += matrix[x+','+y] + 1;
			}
		}
	}
	console.log('Part 1', risk_points_sum, Date.now() - start);
}


{
	const visualize = () => {
		for (let y = 0; y <= size_y; y++) {
			let row = '';
			for (let x = 0; x <= size_x; x++) {
				row += (lowest[x+','+y] ? '\x1b[31m' : ((visited[x+','+y]) ? '\x1b[1m' : '\x1b[2m')) + matrix[x+','+y] + '\x1b[0m';
			}
			console.log(row);
		}
	}
	let start = Date.now();
	let basin_high = [];
	let basins = [];
	let visited = {};
	let lowest = {};
	const getBasinSize = (x, y) => {
		let size = 0;
		[0, 1, 2, 3].forEach(i => {
			let c_x = x;
			let c_y = y;
			let p_num = matrix[c_x + ',' + c_y];
			if (i === 0) c_x -= 1;
			if (i === 1) c_y -= 1;
			if (i === 2) c_x += 1;
			if (i === 3) c_y += 1;
			if (visited[c_x+','+c_y]) return;
			if (typeof matrix[c_x + ',' + c_y] === undefined) return;
			if (matrix[c_x + ',' + c_y] === 9) return;
			//if (matrix[c_x + ',' + c_y] < p_num) return;
			if (matrix[c_x + ',' + c_y] >= p_num) {
				visited[c_x+','+c_y] = true;
				size += 1;
				size += getBasinSize(c_x, c_y);
			}
		});
		return size;
	}
	for (let y = 0; y <= size_y; y++) {
		for (let x = 0; x <= size_x; x++) {
			let smaller = hasSmallNeighbour(x, y, matrix);
			if (smaller === false) {
				visited[x+','+y] = true;
				lowest[x+','+y] = true;
				basins.push(getBasinSize(x, y)+1);
			}
		}
	}
	basins = basins.sort((a, b) => a < b ? -1 : 1);
	let largest = basins.slice(-3);
	let total_num = 1;
	largest.forEach(n => total_num *= n);
	console.log('Part 2', total_num, Date.now() - start);
}
