const fs = require('fs');

const data = fs.readFileSync('data_06.txt').toString('utf8').split(",").map(n => parseInt(n, 10));


{
	let start = Date.now();
	let counters = new Array(10).fill(0);
	let numfish = 0;
	data.forEach(n => {
		++counters[n];
		++numfish;
	});
	for (let day = 0; day < 80; day++) {
		counters[9] += counters[0];
		counters[7] += counters[0];
		numfish += counters[0];
		counters[0] = 0;
		for (let i = 1; i < 10; i++) {
			counters[i-1] = counters[i]; 
			counters[i] = 0;
		}
	}
	console.log('Part 1', numfish, Date.now() - start);
}

{
	let start = Date.now();
	let counters = new Array(10).fill(0);
	let numfish = 0;
	data.forEach(n => {
		++counters[n];
		++numfish;
	});
	for (let day = 0; day < 256; day++) {
		counters[9] += counters[0];
		counters[7] += counters[0];
		numfish += counters[0];
		counters[0] = 0;
		for (let i = 1; i < 10; i++) {
			counters[i-1] = counters[i]; 
			counters[i] = 0;
		}
	}
	console.log('Part 2', numfish, Date.now() - start);
}
