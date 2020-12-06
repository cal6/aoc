const fs = require('fs');
const groups = fs.readFileSync('input_06.txt').toString().split("\n\n");

part1: {
	let total_sum = 0;
	for (let group of groups) {
		group = group.split("\n").join('').split('');
		let sum_distinct = 0, distinct = {};
		for (let answer of group) {
			if (!distinct[answer]) {
				distinct[answer] = true;
				++sum_distinct;
			}
		}
		total_sum += sum_distinct;
	}
	console.log('Part 1', total_sum)
}

part2: {
	let total_sum = 0;
	for (let group of groups) {
		let group_distinct = {};
		const people = group.split("\n");
		for (let person of people) {
			person = person.split('');
			for (let answer of person) {
				if (!group_distinct[answer]) group_distinct[answer] = 0;
				++group_distinct[answer];
			}
		}
		for (let answer in group_distinct) {
			if (group_distinct[answer] === people.length) ++total_sum;
		}
	}
	console.log('Part 2', total_sum)
}