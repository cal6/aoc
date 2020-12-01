const fs = require('fs');
const input = fs.readFileSync('input_01.txt').toString().split("\n").map(n => parseInt(n, 10));

for (let i = 0; i < input.length - 2; i++) {
	for (let j = i + 1; j < input.length - 1; j++) {
		for (let k = j + 1; k < input.length; k++) {
			if (input[i] + input[j] + input[k] === 2020) {
				console.log(i, j, k, input[i], input[j], input[k], (input[i] * input[j] * input[k]));
				process.exit();
			}
		}
	}
}