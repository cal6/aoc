const fs = require('fs');

const data = fs.readFileSync('data11.txt').toString('utf8').split("\n\n").map(b => b.split("\n").map(l => l.split(':').map(i => i.trim())));

class monkey {
	constructor(bl) {
		this.handled = 0;
		this.items = bl[1][1].split(',').map(n => parseInt(n, 10));
		this.calc = bl[2][1].split('=')[1].trim();
		this.test = parseInt(bl[3][1].substr(13), 10);
		this.desttrue = parseInt(bl[4][1].substr(16), 10);
		this.destfalse = parseInt(bl[5][1].substr(16), 10);
	}
	process(nd = false) {
		let item;
		while (item = this.items.pop()) {
			item = eval(this.calc.replace(/old/g, item));
			if (!nd) { item = Math.floor(item / 3); }
			else { item = item % divider; }
			monkeys[(item % this.test === 0) ? this.desttrue : this.destfalse].items.push(item);
			this.handled++;
		}
	}
}

let monkeys;
let divider;
const init = () => {
	monkeys = [];
	divider = 1;
	data.forEach(bl => {
		const mon = new monkey(bl);
		divider *= mon.test;
		monkeys.push(mon);
	});
}

{
	init();
	for (let i = 1; i <= 20; i++) {
		monkeys.forEach(m => m.process());
	}
	monkeys.sort((a, b) => a.handled > b.handled ? -1 : 1);
	let res = monkeys[0].handled * monkeys[1].handled;
	console.log('Result 1', res);
}


{
	init();
	for (let i = 1; i <= 10000; i++) {
		monkeys.forEach(m => m.process(true));
	}
	monkeys.sort((a, b) => a.handled > b.handled ? -1 : 1);
	let res = monkeys[0].handled * monkeys[1].handled;
	console.log('Result 2', res);
}