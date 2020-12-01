const fs = require('fs');
const instructions = fs.readFileSync('input_d02.txt').toString().split("\n");

let paper = 0, ribbon = 0;
for (const line of instructions) {
	const [l, h, w] = line.split('x').map(n => parseInt(n, 10)).sort((a, b) => a < b ? -1 : 1);
	let l1 = l;
	let l2 = h;
	const c_paper = (2 * l * w) + (2 * w * h) + (2 * h * l) + (l1 * l2);
	const c_ribbon = l1 + l1 + l2 + l2 + (l * h * w);
	paper += c_paper;
	ribbon += c_ribbon;
}
console.log(paper, ribbon);

