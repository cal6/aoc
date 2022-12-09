const fs = require('fs');

const data = fs.readFileSync('data09.txt').toString('utf8').split("\n").map(r => r.split(' '));

const isNeighbour = (x1, y1, x2, y2) => {
	return Math.abs(x1-x2) <= 1 && Math.abs(y1-y2) <= 1;
}
const isSelf = (x1, y1, x2, y2) => {
	return x1 === x2 && y1 === y2;
}

let x = new Array(10).fill(0);
let y = new Array(10).fill(0);
let tgrid = [];
for (let i = 0; i <= 9; i++) {
	tgrid[i] = [];
}

data.map(row => {
	const n = parseInt(row[1], 10)
	let d = row[0];
	for (let s = 0; s < n; s++) {
		if (d === 'U') { y[0]--; }
		if (d === 'D') { y[0]++; }
		if (d === 'L') { x[0]--; }
		if (d === 'R') { x[0]++; }
		for (let i = 1; i <= 9; i++) { 
			if (isSelf(x[i-1], y[i-1], x[i], y[i]) || isNeighbour(x[i-1], y[i-1], x[i], y[i])) break;
			if (x[i-1] > x[i]) x[i]++;
			if (x[i-1] < x[i]) x[i]--;
			if (y[i-1] > y[i]) y[i]++;
			if (y[i-1] < y[i]) y[i]--;
		}
		for (let i = 1; i <= 9; i++) {
			if (!tgrid[i][x[i]+'-'+y[i]]) { tgrid[i][x[i]+'-'+y[i]] = true; }
		}
	}
});


{
	res = Object.keys(tgrid[1]).length;
	console.log('Result 1', res);
}


{
	res = Object.keys(tgrid[9]).length;
	console.log('Result 2', res);
}