const fs = require('fs');
const input = fs.readFileSync('input_01.txt').toString().split("\n").map(n => parseInt(n, 10));

part1: {
	console.log('--- start part 1');
	for (let i = 0; i < input.length - 1; i++) {
		for (let j = i + 1; j < input.length; j++) {
			if (input[i] + input[j] === 2020) {
				console.log('part 1', i, j, input[i], input[j], (input[i] * input[j]));
				break part1;
			}
		}
	}
}

part2: {
	console.log('--- start part 2');
	for (let i = 0; i < input.length - 2; i++) {
		for (let j = i + 1; j < input.length - 1; j++) {
			for (let k = j + 1; k < input.length; k++) {
				if (input[i] + input[j] + input[k] === 2020) {
					console.log('part 2', i, j, k, input[i], input[j], input[k], (input[i] * input[j] * input[k]));
					break part2;
				}
			}
		}
	}
}

console.log('--- done');