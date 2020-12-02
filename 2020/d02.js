const fs = require('fs');
const input = fs.readFileSync('input_02.txt').toString().split("\n");

part1: {
	let psw = 0;
	for (const row of input) {
		const [_, f, t, l, p] = row.match(/^([0-9]+)\-([0-9]+) ([a-z]): ([a-z]+)$/);
		const lc = p.split('').filter(pl => pl === l).length;
		if (parseInt(f, 10) <= lc && parseInt(t, 10) >= lc) {
			++psw;
			console.log(f, t, l, p, lc);
		}
	}
	console.log('Total matching passwords', psw);
}

part2: {
	let psw = 0;
	for (const row of input) {
		const [_, f, t, l, p] = row.match(/^([0-9]+)\-([0-9]+) ([a-z]): ([a-z]+)$/);
		const p1 = parseInt(f, 10);
		const p2 = parseInt(t, 10);
		let matches = 0;
		if (p[p1-1] === l) ++matches;
		if (p[p2-1] === l) ++matches;
		if (matches === 1) {
			++psw;
			console.log(p1, p2, l, p);
		}
	}
	console.log('Total matching passwords', psw);
}
