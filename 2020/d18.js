const fs = require('fs');
let input = fs.readFileSync('input_18.txt').toString().split("\n");


part1: {
	const doSimpleMath = (p) => {
		let m;
		while (m = p.match(/(\([0-9]+\))/)) {
			p = p.replace(m[1], m[1].replace('(', '').replace(')', ''));
		}
		while (m = p.match(/([0-9]+ [+\-*/] [0-9]+)/)) {
			p = p.replace(m[1], eval(m[1]))
		}
		return p;
	}
	const calculateResult = (ar) => {
		let m;
		while (m = ar.match(/(\([\ 0-9+\*\/-]+\))/)) {
			ar = ar.replace(m[1], doSimpleMath(m[1]));
		}
		return doSimpleMath(ar);
	}

	let total = 0;
	for (let ar of input) {
		total += parseInt(calculateResult(ar), 10);
	}
	console.log('part 1', total)
}

part2: {
	const doSimpleMath = (p) => {
		let m;
		while (m = p.match(/(\([0-9]+\))/)) {
			p = p.replace(m[1], m[1].replace('(', '').replace(')', ''));
		}
		while (m = p.match(/([0-9]+ [+\-] [0-9]+)/)) {
			p = p.replace(m[1], eval(m[1]))
		}
		while (m = p.match(/([0-9]+ [*/] [0-9]+)/)) {
			p = p.replace(m[1], eval(m[1]))
		}
		return p;
	}
	const calculateResult = (ar) => {
		let m;
		while (m = ar.match(/(\([\ 0-9+\*\/-]+\))/)) {
			ar = ar.replace(m[1], doSimpleMath(m[1]));
		}
		return doSimpleMath(ar);
	}

	let total = 0;
	for (let ar of input) {
		total += parseInt(calculateResult(ar), 10);
	}
	console.log('part 1', total)
}
