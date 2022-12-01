const fs = require('fs');


const visualize = (hideoutput = false) => {
	let count = 0;
	for (let y = 0; y <= size_y; y++) {
		let row = '';
		for (let x = 0; x <= size_x; x++) {
			row += (matrix[x+','+y] ? '\x1b[1m'+matrix[x+','+y] : '\x1b[2m.') + '\x1b[0m';
			if (matrix[x+','+y]) ++count;
		}
		if (!hideoutput) console.log(row);
	}
	if (!hideoutput) console.log('');
	return count;
}

let matrix = {};
let size_x = 0;
let size_y = 0;

const data = fs.readFileSync('data_25.txt').toString('utf8').split("\n");

data.forEach((row, y) => {
	row.split('').forEach((n, x) => {
		if (n !== '.') matrix[x+','+y] = n;
		size_x = Math.max(size_x, x);
	});
	size_y = Math.max(size_y, y);
});

{
	let start = Date.now();
	//visualize();
	let moves = 0;
	while (true) {
		let moved = false;
		['>', 'v'].forEach(dir => {
			let nmatrix = {};
			for (let y = 0; y <= size_y; y++) {
				for (let x = 0; x <= size_x; x++) {
					let curpos = x+','+y;
					let newpos = dir === '>' ? (x===size_x?0:x+1)+','+y : x+','+(y===size_y?0:y+1);
					if (matrix[curpos] !== dir) {
						if (matrix[curpos]) nmatrix[curpos] = matrix[curpos];
						continue;
					}
					if (!matrix[newpos]) { 
						nmatrix[newpos] = dir; 
						moved = true; 
					} else {
						nmatrix[curpos] = dir;
					}
				}
			}
			matrix = nmatrix;
		});
		if (!moved) break;
		moves++;
		//visualize();
	}
	console.log('Part 1', (moves+1), Date.now() - start);
}