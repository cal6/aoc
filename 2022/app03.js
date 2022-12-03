const fs = require('fs');

const data = fs.readFileSync('data03.txt').toString('utf8').split("\n").map(r => r.split('').map(l => l.charCodeAt(0)-96).map(n => n < 1 ? n + 58 : n));

{
	let res = 0;
	data.forEach(row => {
		const f = row.slice(0, row.length/2);
		const s = row.slice(row.length/2);
		const is = f.filter(value => s.includes(value)).filter((v, i, a) => a.indexOf(v) === i)
		res += is.reduce((s, a) => s + a, 0)
	});
	console.log('Result 1', res);
}

{
	let res = 0;
	for (let i = 0; i < data.length-1; i+=3) {
			const d = [data[i], data[i+1], data[i+2]];
			const is = d.reduce((a, b) => a.filter(c => b.includes(c))).filter((v, i, a) => a.indexOf(v) === i);
			res += is.reduce((s, a) => s + a, 0)
	}
	console.log('Result 2', res);
}