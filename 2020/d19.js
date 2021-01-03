const fs = require('fs');
let input = fs.readFileSync('input_19.txt').toString().split("\n");

const runPart = (part) => {
	let rules = [];
	let parsed = [];
	let regex;
	const calculateRegex = () => {
		rules.sort((a, b) => a.order < b.order ? -1 : 1);
		let nextup;
		while (nextup = rules.filter(r => r.nextup)) {
			if (nextup.length === rules.length) break;
			rules.map(rule => {
				if (rule.nextup) return;
				nextup.map(content => {
					const re = new RegExp("\ "+content.order+"\ ", "g");
					rule.rule = rule.rule.replace(re, ' ' + content.rule + ' ')
				});
				if (!rule.rule.match(/[0-9]/)) rule.nextup = true;
				if (rule.rule.match(new RegExp("\ "+rule.order+"\ ", "g"))) {
					for (let i = 0; i <= 4; i++) {
						rule.rule = rule.rule.replace(new RegExp("\ "+rule.order+"\ ", "g"), ' ( ' + rule.rule + ' ) ')
					}
					rule.rule = rule.rule.replace(" " + rule.order + " ", " ");
				}
			})

		}
		return rules[0].rule.replace(/\ /g, '');
	}
	const parseRule = (order, rule) => {
		let rulecontent = rule.startsWith('"') ? rule.replace(/\"/g, '') : rule;
		rulecontent = rulecontent.replace(/([0-9\ ]+) \| ([0-9\ ]+)/g, " ( $1 | $2 ) ");
		let ret = {order: parseInt(order, 10), rule: ' ' + rulecontent + ' ', nextup: rule.startsWith('"')}
		return ret;
	}
	let matches = 0;
	for (let row of input) {
		if (row.trim() === '') {
			rules.sort((a, b) => a.order < b.order ? -1 : 1);
			regex = new RegExp('^'+calculateRegex()+'$', 'g');
			continue;
		}
		if (/[0-9]+:/.test(row)) {
			let [_, order, rule] = row.match(/([0-9]+): (.*)/);
			if (part === 2) {
				if (order === '8') rule = '42 | 42 8';
				if (order === '11') rule = '42 31 | 42 11 31';
			}
			rules.push(parseRule(order, rule));
			continue;
		}
		if (row.match(regex)) {
			++matches;
		}
	}
	return matches;
}
console.log('part 1', runPart(1));
console.log('part 2', runPart(2));
