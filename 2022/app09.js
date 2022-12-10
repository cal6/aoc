const fs = require('fs');

const data = fs.readFileSync('data09.txt').toString('utf8').split("\n").map(r => r.split(' '));

const isClose = (x1, y1, x2, y2) => {
	return (Math.abs(x1-x2) <= 1 && Math.abs(y1-y2) <= 1) || (x1 === x2 && y1 === y2);
}

let x = new Array(10).fill(0);
let y = new Array(10).fill(0);
let tgrid = Array.from(Array(10), () => new Set())

data.map(row => {
	const n = parseInt(row[1], 10)
	let d = row[0];
	for (let s = 0; s < n; s++) {
		for (let i = 0; i <= 9; i++) { 
			if (i > 0 && isClose(x[i-1], y[i-1], x[i], y[i])) break;
			if (d === 'R' || x[i-1] > x[i]) x[i]++;
			if (d === 'L' || x[i-1] < x[i]) x[i]--;
			if (d === 'D' || y[i-1] > y[i]) y[i]++;
			if (d === 'U' || y[i-1] < y[i]) y[i]--;
			tgrid[i].add(x[i]+'-'+y[i]);
		}
	}
});


{
	console.log('Result 1', tgrid[1].size);
}


{
	console.log('Result 2', tgrid[9].size);
}