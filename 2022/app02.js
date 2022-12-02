const fs = require('fs');


const data = fs.readFileSync('data02.txt').toString('utf8')
		.replace(/A/g, '1').replace(/B/g, '2').replace(/C/g, '3')
		.replace(/X/g, '1').replace(/Y/g, '2').replace(/Z/g, '3')
		.split("\n").map(r => r.split(' ').map(n => parseInt(n, 10)));

{
	let res = 0;
	data.forEach(row => {
		res += row[1] + (row[0] === row[1] ? 3 : (row[0] === row[1] - 1 || row[0] === row[1] + 2) ? 6 : 0);
	});
	console.log('Result 1', res);
}


{
	let res = 0;
	data.forEach(row => {
		const wr = row[1] === 3 ? 6 : row[1] === 2 ? 3 : 0;
		res += wr + (wr === 3 ? row[0] : wr === 0 ? (row[0] - 1 === 0 ? 3 : row[0] - 1) : (row[0] + 1 === 4 ? 1 : row[0] + 1));
	});
	console.log('Result 2', res);
}