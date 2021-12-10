const fs = require('fs');

const data = fs.readFileSync('data_07.txt').toString('utf8').split(",").map(n => parseInt(n, 10));


{
	let start = Date.now();
	let smallnum = 1e200;
	let smallpos = null;
	for (let i = 0; i < data.length; i++) {
		let fuel = 0;
		data.forEach(n => {
			fuel += Math.abs(n - i);
		});
		if (fuel < smallnum) {
			smallnum = fuel;
			smallpos = i;
		}
	}
	console.log('Part 1', smallpos, smallnum, Date.now() - start);
}

{
	let start = Date.now();
	let smallnum = 1e200;
	let smallpos = null;
	for (let i = 0; i < data.length; i++) {
		let fuel = 0;
		data.forEach(n => {
			const distance = Math.abs(n - i);
			fuel += distance*((1 + distance)/2);
		});
		if (fuel < smallnum) {
			smallnum = fuel;
			smallpos = i;
		}
	}
	console.log('Part 2', smallpos, smallnum, Date.now() - start);
}
