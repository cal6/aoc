const fs = require('fs');
let input = fs.readFileSync('input_16.txt').toString().split("\n");


part1: {
	let start = false;
	let rules = new Map();
	let errors = 0;
	const addRule = (name, ruleset) => {
		ruleset = ruleset.split('or').map(s => s.trim().split('-').map(n => parseInt(n, 10)));
		rules.set(name, ruleset);
	}
	const invalidSum = (ticket) => {
		ticket = ticket.split(',').map(n => parseInt(n, 10));
		let errorsum = 0;
		for (let num of ticket) {
			let has_rule = false;
			for (let [rulename, ruleset] of rules) {
				for (let rule of ruleset) {
					if (num >= rule[0] && num <= rule[1]) has_rule = true;
				}
			}
			if (!has_rule) errorsum += num;
		}
		return errorsum;
	}
	for (const row of input) {
		if (!start) {
			const matches = row.match(/^([a-z ]+): (.*)$/);
			if (matches) {
				addRule(matches[1], matches[2]);
			}
		}
		if (row === 'nearby tickets:') { start = true; continue; }
		if (!start) continue;
		errors += invalidSum(row);
	}
	console.log('part 1', errors);
}

part2: {
	let start = false, yourticket = false;
	let rules = new Map();
	let validtickets = [];
	const addRule = (name, ruleset) => {
		ruleset = ruleset.split('or').map(s => s.trim().split('-').map(n => parseInt(n, 10)));
		rules.set(name, ruleset);
	}
	const invalidSum = (ticket) => {
		let errorsum = 0;
		for (let num of ticket) {
			let has_rule = false;
			for (let [rulename, ruleset] of rules) {
				for (let rule of ruleset) {
					if (num >= rule[0] && num <= rule[1]) has_rule = true;
				}
			}
			if (!has_rule) errorsum += num;
		}
		return errorsum;
	}
	let field_order = []
	const detectFieldOrder = (tickets) => {
		for (let fld = 0; fld < tickets[0].length; fld++) {
			if (field_order.length === rules.size) return;
			if (field_order.filter(f => f.fld === fld).length > 0) {
				continue;
			}
			let no_violates = [];
			for (let [rulename, ruleset] of rules) {
				if (field_order.filter(f => f.rule === rulename).length > 0) {
					continue;
				}
				let violates = false;
				for (let ticket of tickets) {
					let num = ticket[fld];
					let has_rule = false;
					for (let rule of ruleset) {
						if (num >= rule[0] && num <= rule[1]) has_rule = true;
					}
					if (!has_rule) violates = true;
				}
				if (!violates) no_violates.push({fld: fld, rule: rulename})
			}
			if (no_violates.length === 1) {
				field_order.push(no_violates[0])
				return detectFieldOrder(tickets);
			}
		}
	}

	for (const row of input) {
		if (!start) {
			const matches = row.match(/^([a-z ]+): (.*)$/);
			if (matches) {
				addRule(matches[1], matches[2]);
			}
		}
		if (row === 'nearby tickets:') { start = true; continue; }
		if (row === 'your ticket:') { yourticket = true; continue; }
		if (yourticket === true) yourticket = row.split(',').map(n => parseInt(n, 10));
		if (!start) continue;
		let ticket = row.split(',').map(n => parseInt(n, 10));
		if (invalidSum(ticket) === 0) {
			validtickets.push(ticket);
		}
	}
	detectFieldOrder(validtickets);
	field_order.sort((a, b) => a.fld < b.fld ? -1 : 1);
	let sum = 1;
	field_order.map(f => {
		if (f.rule.startsWith('departure')) sum *= yourticket[f.fld];
	});
	console.log('part 2', sum);
}

