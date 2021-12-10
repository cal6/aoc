const fs = require('fs');

const data = fs.readFileSync('data_10.txt').toString('utf8').split("\n");

const isCorrupted = (chars, retarr = false) => {
	let arr = [];
	for (let i = 0; i < chars.length; i++) {
		const char = chars[i];
		if (char === '<' || char === '[' || char === '{' || char === '(') arr.push(char);
		else {
			const last = arr.pop();
			if (char === '>' && last !== '<') return char;
			if (char === ']' && last !== '[') return char;
			if (char === '}' && last !== '{') return char;
			if (char === ')' && last !== '(') return char;
		}
	}
	return retarr ? arr : false;
}

const getRemining = (arr) => {
	let retarr = [];
	while (true) {
		if (arr.length === 0) break;
		const char = arr.pop();
		if (char === '<') retarr.push('>');
		if (char === '[') retarr.push(']');
		if (char === '{') retarr.push('}');
		if (char === '(') retarr.push(')');
	}
	return retarr;
}

{
	let start = Date.now();
	let score = 0;
	data.forEach(row => {
		const cs = isCorrupted(row.split(''));
		switch (cs) {
			case ')': score += 3; break;
			case ']': score += 57; break;
			case '}': score += 1197; break;
			case '>': score += 25137; break;
			default: break;
		}
	})
	console.log('Part 1', score, Date.now() - start);
}

{
	let start = Date.now();
	let scores = [];
	data.forEach(row => {
		const cs = isCorrupted(row.split(''), true);
		if (Array.isArray(cs) && cs.length > 0) {
			let score = 0;
			const missing = getRemining(cs);
			missing.forEach(ch => {
				switch (ch) {
					case ')': score = score * 5 + 1; break;
					case ']': score = score * 5 + 2; break;
					case '}': score = score * 5 + 3; break;
					case '>': score = score * 5 + 4; break;
					default: break;
				}
			});
			scores.push(score);
		}
	});
	scores.sort((a, b) => a > b ? -1 : 1);
	const score = scores[Math.floor(scores.length/2)]
	console.log('Part 2', score, Date.now() - start);
}
