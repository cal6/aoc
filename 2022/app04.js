const fs = require('fs');

const data = fs.readFileSync('data04.txt').toString('utf8').split("\n").map(r => r.split(',').map(p => p.split('-').map(n => parseInt(n, 10))));

{
	let res = 0;
	data.forEach(p => {
		if (p[0][0] >= p[1][0] && p[0][1] <= p[1][1] || p[1][0] >= p[0][0] && p[1][1] <= p[0][1]) res++;
	});
	console.log('Result 1', res);
}


{
	let res = 0;
	data.forEach(p => {
		if (p[0][0] >= p[1][0] && p[0][0] <= p[1][1] || p[1][0] >= p[0][0] && p[1][0] <= p[0][1] || p[0][1] >= p[1][0] && p[0][0] <= p[1][1] || p[1][1] >= p[0][0] && p[1][0] <= p[0][1]) res++;
	});
	console.log('Result 2', res);
}