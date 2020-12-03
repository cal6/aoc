const fs = require('fs');
const input = fs.readFileSync('input_03.txt').toString().split("\n");

let coords = {};
let max_x = 0;
let max_y = input.length;
for (let y in input) {
	const ls = input[y].split('');
	if (!max_x) max_x = ls.length;
	for (let x = 0; x < ls.length; x++) {
		coords[(x+1)+','+(parseInt(y, 10)+1)] = (ls[x] === '#');
	}
}

part1: {
	let loc = {x: 1, y: 1};
	let trees = 0;
	while (true) {
		loc.x += 3;
		loc.y += 1;
		if (loc.y > max_y) break;
		if (loc.x > max_x) loc.x -= max_x;
		if (coords[loc.x +','+loc.y]) { ++trees; }
	}
	console.log('trees 3,1', trees);
}

part2: {
	let tot = 1;
	for (let it of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
		console.log(it)
		let loc = {x: 1, y: 1};
		let trees = 0;
		while (true) {
			loc.x += it[0];
			loc.y += it[1];
			if (loc.y > max_y) break;
			if (loc.x > max_x) loc.x -= max_x;
			if (coords[loc.x +','+loc.y]) { ++trees; }
		}
		console.log('trees', it, trees);
		tot *= trees;
	}
	console.log('total trees', tot);
}