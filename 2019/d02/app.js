const fs = require('fs');


let input = [], noun = 0, verb = 0;

const findresult = (chain) => {
	for (let i = 0; i < input.length; i += 4) {
		if (input[i] === 99) {
			return input[0];
		} else {
			const var1 = input[input[i+1]];
			const var2 = input[input[i+2]];
			let sum = 0;
			if (input[i] === 1) {
				sum = var1 + var2;
			} else if (input[i] === 2) {
				sum = var1 * var2;
			}
			input[input[i+3]] = sum;
		}
	}
	return input[0];
};

for (noun = 0; noun <= 99; noun++) {
	nextnounverb:
	for (verb = 0; verb <= 99; verb++) {
		input = fs.readFileSync('./input.txt').toString('utf8').split(',').filter(a => !!a).map(a => parseInt(a, 10));
		input[1] = noun; input[2] = verb;
		const res = findresult(input);
		if (res === 19690720) {
			console.log(res, noun, verb);
		}
	}
}


