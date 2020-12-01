const full_match = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
};

const fs = require('fs');
const instructions = fs.readFileSync('input_d16.txt').toString().split("\n");

for (let instruction of instructions) {
	let [_, name, entries] = instruction.match(/^Sue ([0-9]+): (.*)$/);
	entries = entries.split(',');
	let is_match = true;
	entries.forEach(entry => {
		let [prop, val] = entry.split(':');
		prop = prop.trim();
		val = parseInt(val, 10);
		if (['cats', 'trees'].indexOf(prop) > -1 && full_match[prop] >= val) { is_match = false; }
		else if (['pomeranians', 'goldfish'].indexOf(prop) > -1 && full_match[prop] <= val) { is_match = false; }
		else if (['cats', 'trees', 'pomeranians', 'goldfish'].indexOf(prop) < 0 && full_match[prop] !== val) { is_match = false; }
	});
	if (is_match) { console.log(name, '+++ WAS WINNER'); }
}
