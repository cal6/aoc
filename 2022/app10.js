const fs = require('fs');

const data = fs.readFileSync('data10.txt').toString('utf8').split("\n").map(r => r.split(' '));

{
	let res = 0;
	let x = 1;
	let cycles = 0;
	const addCycle = () => {
		cycles++;
		if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
			res += cycles * x;
		}
	}
	data.map(row => {
		addCycle();
		if (row[0] === 'noop') return;
		addCycle();
		x += parseInt(row[1]); 
	})
	console.log('Result 1', res);
}


{
	let x = 1;
	let cycles = 0;
	let matrix = [];
	const addCycle = () => {
		let cyrbit = cycles;
		while (cyrbit > 39) cyrbit -= 40;
		if (x - 1 === cyrbit || x === cyrbit || x + 1 === cyrbit) { 
			matrix[cycles] = true;
		}
		cycles++;
	}
	data.map(row => {
		addCycle();
		if (row[0] === 'noop') return;
		addCycle();
		x += parseInt(row[1], 10); 
	})
	console.log('Result 2');
	let res = '';
	for (let i = 0; i < 240; i++) {
		if ([40, 80, 120, 160, 200, 240].includes(i)) res += "\n";
		res += matrix[i] ? '#' : ' ';
	}
	console.log(res);
}