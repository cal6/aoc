const fs = require('fs');


const data = fs.readFileSync('data02.txt').toString('utf8')
		.replace(/A/g, '1').replace(/B/g, '2').replace(/C/g, '3')
		.replace(/X/g, '1').replace(/Y/g, '2').replace(/Z/g, '3')
		.split("\n");


{
	let res = 0;
	data.forEach(row => {
		const [e, y] = row.split(' ').map(n => parseInt(n, 10));
		res += y;
		if (e === y) res += 3;
		else if (e === y - 1 || e === y + 2) res += 6;
	});
	console.log('Result 1', res);
}


{
	let res = 0;
	data.forEach(row => {
		const [e, y] = row.split(' ').map(n => parseInt(n, 10));
		const wr = y === 3 ? 6 : y === 2 ? 3 : 0;
		res += wr;
		if (wr === 3) res += e;
		if (wr === 0) res += e - 1 === 0 ? 3 : e - 1;
		if (wr === 6) res += e + 1 === 4 ? 1 : e + 1;
	});
	console.log('Result 2', res);
}