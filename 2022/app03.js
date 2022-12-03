const fs = require('fs');

const data = fs.readFileSync('data03.txt').toString('utf8').split("\n").map(r => r.split('').map(l => l.charCodeAt(0)-96).map(n => n < 1 ? n + 58 : n));

{
	let res = 0;
	data.forEach(row => {
		res += row.slice(0, row.length/2).filter(value => row.slice(row.length/2).includes(value)).filter((v, i, a) => a.indexOf(v) === i).reduce((s, a) => s + a, 0);
	});
	console.log('Result 1', res);
}

{
	let res = 0;
	for (let i = 0; i < data.length-1; i+=3) {
			res += [data[i], data[i+1], data[i+2]].reduce((a, b) => a.filter(c => b.includes(c))).filter((v, i, a) => a.indexOf(v) === i).reduce((s, a) => s + a, 0);
	}
	console.log('Result 2', res);
}