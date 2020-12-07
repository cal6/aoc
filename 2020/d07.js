const fs = require('fs');
const groups = fs.readFileSync('input_07.txt').toString().split("\n");

part1: {
	const nodes = {};
	for (const line of groups) {
		let [_, master, slaves] = line.match(/^(.*?) bags contain (.*)$/);
		slaves = slaves.split(',').map(s => s.replace(/[ \.]$/, '').replace('bags', '').replace('bag', '').trim());
		for (let slave of slaves) {
			if (slave === 'no other') { continue; }
			let [_, amount, bag] = slave.match(/^([0-9]+) (.*)$/);
			if (!nodes[bag]) { nodes[bag] = []; }
			nodes[bag].push({am: parseInt(amount, 10), na: master});
		}
	}
	let holders = {}, holders_size = 0;
	function onlyUnique(v, i, self) {
 		return self.indexOf(v.na) === i.na;
	}
	const getChildren = (node, add = false) => {
		if (add && !holders[node]) { holders[node] = true; ++holders_size; }
		(nodes[node]||[]).map(n => {
			getChildren(n.na, true);
		});
	};
	getChildren('shiny gold');
	console.log('part 1', holders_size);
}

part2: {
	const nodes = {};
	for (const line of groups) {
		let [_, master, slaves] = line.match(/^(.*?) bags contain (.*)$/);
		slaves = slaves.split(',').map(s => s.replace(/[ \.]$/, '').replace('bags', '').replace('bag', '').trim());
		let children = [];
		for (let slave of slaves) {
			if (slave === 'no other') { continue; }
			let [_, amount, bag] = slave.match(/^([0-9]+) (.*)$/);
			children.push({am: parseInt(amount, 10), na: bag});
		}
		nodes[master] = children;
	}
	const countBags = (node) => {
		let total = 1;
		nodes[node].map(n => {
			total += countBags(n.na) * n.am;
		});
		return total;
	};
	let bags = countBags('shiny gold') - 1;
	console.log('part 2', bags);
}

