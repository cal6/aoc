const fs = require('fs');
let input = fs.readFileSync('input_14.txt').toString().split("\n");

part1: {
	let bitmask = [];
	let output = [];
	const applyBitMask = (num) => {
		num = (num>>>0).toString(2).split('');
		while (num.length < bitmask.length) {
			num.unshift('0');
		}
		for (let i = 0; i < num.length; i++) {
			if (bitmask[i] === 'X') continue;
			num[i] = bitmask[i];
		}
		return parseInt(num.join(''), 2);
	}
	for (let i = 0; i < input.length; i++) {
		if (input[i].startsWith('mask = ')) {
			let [_, bm] = input[i].match(/mask = ([X01]+)/);
			bitmask = bm.split('');
		} else {
			let [_, slot, val] = input[i].match(/mem\[([0-9]+)\] = ([0-9]+)/);
			output[slot] = applyBitMask(val);
		}
	}
	let sum = 0;
	for (let out of output) {
		sum += out || 0;
	}
	console.log('part 1', sum);
}


part2: {
	let bitmask = [];
	let output = {};
	const getBitMasks = (mask) => {
		const index = mask.indexOf('X');
		if (index < 0) { return [mask]; }
		let inp1 = mask.slice(0);
		inp1[index] = '1';
		let mask1 = getBitMasks(inp1);
		let inp2 = mask.slice(0);
		inp2[index] = '0';
		let mask2 = getBitMasks(inp2);
		return mask1.concat(mask2);
	}
	const calculateBitMasks = (ip) => {
		num = (ip>>>0).toString(2).split('');
		while (num.length < bitmask.length) {
			num.unshift('0');
		}
		for (let i = 0; i < num.length; i++) {
			if (bitmask[i] === '1') num[i] = '1';
			if (bitmask[i] === 'X') num[i] = 'X';
		}
		let combinations = getBitMasks(num);
		return combinations;
	}
	for (let i = 0; i < input.length; i++) {
		console.log(i, input[i]);
		if (input[i].startsWith('mask = ')) {
			let [_, bm] = input[i].match(/mask = ([X01]+)/);
			bitmask = bm.split('');
		} else {
			let [_, slot, val] = input[i].match(/mem\[([0-9]+)\] = ([0-9]+)/);
			const slots = calculateBitMasks(slot);
			for (let op of slots) {
				output[parseInt(op.join(''), 2)] = parseInt(val, 10);
			}
		}
	}
	let sum = 0;
	for (let out in output) {
		sum += output[out] || 0;
	}
	console.log('part 2', sum);
}
