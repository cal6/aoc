const fs = require('fs');
const readline = require('readline-sync');

let input = [], noun = 0, verb = 0;

const findresult = (chain, returnoutput = null, inputs) => {
	let i = 0, inputcount = 0;
	while (i < chain.length) {
		const command = input[i].toString();
		const action = parseInt(command.substring(command.length - 2), 10);
		const param1 = command.length >= 3 ? parseInt(command.substring(command.length - 3, command.length - 2), 10) : 0;
		const param2 = command.length >= 4 ? parseInt(command.substring(command.length - 4, command.length - 3), 10) : 0;
		const param3 = command.length >= 5 ? parseInt(command.substring(command.length - 5, command.length - 4), 10) : 0;
		if (action === 99) {
			break;
		} else if (action === 1 || action === 2) {
			const var1   = !param1 ? input[input[i+1]] : input[i+1];
			const var2   = !param2 ? input[input[i+2]] : input[i+2];
			const target = !param3 ? input[i+3] : i+3;
			let sum = 0;
			if (action === 1) {
				sum = var1 + var2;
			} else if (action === 2) {
				sum = var1 * var2;
			}
			input[target] = sum;
			i += 4;
		} else if (action === 3) {
			const target = !param1 ? input[i+1] : i+1;
			let answer;
			if (inputs !== null) { answer = inputs[inputcount]; inputcount++; }
			else { answer = readline.question('Please provide input: '); }
			input[target] = parseInt(answer, 10);
			console.log('Input provided', input[target], 'target address', target, 'inputcount', inputcount)
			i += 2;
		} else if (action === 4) {
			const target = !param1 ? input[i+1] : i+1;
			console.log('output', i, input[target]);
			if (returnoutput !== null) { return input[target] }
			i += 2;
		} else if (action === 5 || action === 6) {
			const var1   = !param1 ? input[input[i+1]] : input[i+1];
			const var2   = !param2 ? input[input[i+2]] : input[i+2];
			if (action === 5 && var1 !== 0) { i = var2; } else if (action === 5) { i += 3; }
			if (action === 6 && var1 === 0) { i = var2; } else if (action === 6)  { i += 3; }
		} else if (action === 7 || action === 8) {
			const var1   = !param1 ? input[input[i+1]] : input[i+1];
			const var2   = !param2 ? input[input[i+2]] : input[i+2];
			const target = !param3 ? input[i+3] : i+3;
			let target_value = 0;
			if (action === 7 && var1 < var2) { target_value = 1; }
			if (action === 8 && var1 === var2) { target_value = 1; }
			input[target] = target_value;
			i += 4;
		} else {
			console.log('Incorrect action!', i, command, action);
			process.exit()
		}
	}
	return input[0];
};

const n2a = (num) => {
	let arr = num.toString().split("").map(a => parseInt(a, 10));
	for (let i = arr.length; i < 5; i++) {
		arr.unshift(0);
	}
	return arr;
};

const iu = (arr) => {
	let unique = arr.filter((v, i, a) => a.indexOf(v) === i);
	unique = unique.filter(a => a < 6)
	if (unique.length !== arr.length) return false;
	return true;
};

let max_result = -1, max_seq;
for (let seq = 1234; seq < 54321; seq++) {
	const phase_setting = n2a(seq);
	if (!iu(phase_setting)) continue;
	let last_result = 0;
	phase_setting.forEach(phase => {
		input = fs.readFileSync('./input.txt').toString('utf8').split(',').filter(a => !!a).map(a => parseInt(a, 10));
		last_result = findresult(input, true, [phase, last_result]);
		if (max_result < last_result) { max_result = last_result; max_seq = phase_setting; }
	})
}
console.log('max_result', max_result, max_seq);
// const res = findresult(input);
// console.log('finite', res);


