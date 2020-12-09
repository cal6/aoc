const fs = require('fs');
const nums = fs.readFileSync('input_09.txt').toString().split("\n").map(n => parseInt(n, 10));

const PRE_SIZE = 25;
let sums = [];

const calculatePreamble = (pos) => {
	let sums = [];
	for (let i = pos - PRE_SIZE; i < pos; i++) {
		for (let j = pos - PRE_SIZE; j < pos; j++) {
			sums.push(nums[i] + nums[j]);
		}
	}
	return sums;
};

const findContiguousSet = (num) => {
	for (let i = 0; i < nums.length-1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			let sum = 0, sum_nums = [];
			for (let k = i; k <= j; k++) { sum += nums[k]; sum_nums.push(nums[k]); }
			if (sum === num) return sum_nums;
			if (sum > num) { break; }
		}
	}
};

for (let i = PRE_SIZE; i < nums.length; i++) {
	const preamble_sums = calculatePreamble(i);
	if (preamble_sums.indexOf(nums[i]) < 0) {
		console.log('part 1', nums[i]);
		const set = findContiguousSet(nums[i]).sort((a, b) => a < b ? -1 : 1);
		console.log('part 2', (set[0] + set[set.length-1]))
		break;
	}
}
