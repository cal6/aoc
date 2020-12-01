const fs = require('fs');
const instructions = fs.readFileSync('input_d05.txt').toString().split("\n");

const vovels = ['a','e','i','o','u'];
const forbidden = ['ab', 'cd', 'pq', 'xy'];
let words = 0, nicewords = 0;
for (const line of instructions) {
	const letters = line.split('');
	let has_one_over = null, has_duple = null;
	for (let n = 0; n < letters.length-2; n++) {
		if (letters[n] === letters[n+2]) has_one_over = letters[n];
		const duple = letters[n]+letters[n+1];
		if (line.substr(n+2).indexOf(duple) > -1) has_duple = duple;
	}
	if (has_duple && has_one_over) ++nicewords;
}
console.log(nicewords);
