const fs = require('fs');
const Graph = require('node-dijkstra')

const data = fs.readFileSync('data_15.txt').toString('utf8').split("\n");

const visualize = (path) => {
	for (let y = 0; y <= size_y; y++) {
		let row = '';
		for (let x = 0; x <= size_x; x++) {
			row += (path.indexOf(x+','+y) > -1 ? '\x1b[1m' : '\x1b[2m') + matrix[x+','+y] + '\x1b[0m';
		}
		console.log(row);
	}
	console.log('');
}

let matrix = {};
let size_x = 0;
let size_y = 0;
let graph = new Graph();

const resetMatrix = (times = 1) => {

	matrix = {};
	size_x = 0;
	size_y = 0;
	graph = new Graph();

	data.forEach((row, y) => {
		row.split('').forEach((n, x) => {
			matrix[x+','+y] = parseInt(n, 10);
			size_x = Math.max(size_x, x);
		});
		size_y = Math.max(size_y, y);
	});
	let i_size_x = size_x;
	let i_size_y = size_y;
	for (let i = 1; i < times; i++) {
		let nx_base = i_size_x * i + i;
		for (let x = 0; x <= i_size_x; x++) {
			let nx = x+nx_base;
			for (let y = 0; y <= i_size_y; y++) {
				let nk = nx+','+y;
				matrix[nk] = matrix[(nx-i_size_x-1)+','+y] + 1;
				if (matrix[nk] > 9) matrix[nk] = 1;
				size_x = Math.max(size_x, nx);
			}
		}
	}

	for (let i = 1; i < times; i++) {
		let ny_base = i_size_y * i + i;
		for (let y = 0; y <= i_size_y; y++) {
			let ny = y+ny_base;
			for (let x = 0; x <= size_x; x++) {
				let nk = x+','+ny;
				matrix[nk] = matrix[x+','+(ny-i_size_y-1)] + 1;
				if (matrix[nk] > 9) matrix[nk] = 1;
				size_y = Math.max(size_y, ny);
			}
		}
	}

	for (let sx = 0; sx <= size_x; sx++) {
		for (let sy = 0; sy <= size_y; sy++) {
			const n = sx+','+sy;
			const node = {};
			[[-1,0], [1, 0], [0, -1], [0,1]].forEach(c => {
				const x = sx + c[0];
				const y = sy + c[1];
				if (x < 0 || y < 0) return;
				if (x > size_x || y > size_y) return;
				const nn = x+','+y;
				node[nn] = matrix[nn];
			});
			graph.addNode(n, node);
		}
	}
}


{
	let start = Date.now();
	resetMatrix(1);
	const path = graph.path(0+','+0, size_x+','+size_y);
	let sum = 0;
	for (let i = 1; i < path.length; i++) sum += matrix[path[i]];
	console.log('Part 1', sum, Date.now() - start);
}

{
	let start = Date.now();
	resetMatrix(5);
	const path = graph.path(0+','+0, size_x+','+size_y);
	let sum = 0;
	for (let i = 1; i < path.length; i++) sum += matrix[path[i]];
	console.log('Part 2', sum, Date.now() - start);
}
