const fs = require('fs');

const data = fs.readFileSync('data_14.txt').toString('utf8').split("\n");



let o_polymer = data[0].split('');
let enhancements = {};
data.forEach(row => {
	if (row.indexOf('->') < 0) return;
	const [pair, addon] = row.split(' -> ');
	enhancements[pair] = addon;
});

{
	// Yes, of course use the brute force for quick star
	let start = Date.now();
	let polymer = o_polymer.slice(0);
	for (let turn = 0; turn < 10; turn++) {
		let polymer_new = [];
		for (let i = 1; i < polymer.length; i++) {
			polymer_new.push(polymer[i-1]);
			if (enhancements[polymer[i-1]+polymer[i]] !== undefined) {
				polymer_new.push(enhancements[polymer[i-1]+polymer[i]]);
			}
		}
		polymer_new.push(polymer[polymer.length-1]);
		polymer = polymer_new.slice(0);
	}
	let map = {};
	polymer.forEach(el => {
		if (!map[el]) map[el] = 0;
		++map[el];
	});
	let lc = {c: '', n: 1e200};
	let mc = {c: '', n: -1e200};
	for (let [c, n] of Object.entries(map)) {
		if (n < lc.n) lc = {c: c, n: n};
		if (n > mc.n) mc = {c: c, n: n};
	}
	console.log('Part 1', mc.n-lc.n, Date.now() - start);
}


{
	// But, for better solution - use pairs and count them up
	let start = Date.now();
	let polymer = o_polymer.slice(0);
	let pairs = {};
	let chars = {};
	for (let i = 1; i < polymer.length; i++) {
		const pair = polymer[i-1]+polymer[i];
		if (!pairs[pair]) pairs[pair] = 0;
		++pairs[pair];
	}
	polymer.forEach(c => {
		if (!chars[c]) chars[c] = 0;
		++chars[c];
	});

	for (let turn = 0; turn < 40; turn++) {
		let pairs_new = {};
		const addPair = (p, c) => {
			if (!pairs_new[p]) pairs_new[p] = 0;
			pairs_new[p] += c;
		}
		for (const [p, c] of Object.entries(pairs)) {
			if (enhancements[p]) {
				if (!chars[enhancements[p]]) chars[enhancements[p]] = 0;
				chars[enhancements[p]] += c;
				addPair(p[0]+enhancements[p], c);
				addPair(enhancements[p]+p[1], c);
			} else {
				console.error('what??', p); process.exit();
			}
		}
		pairs = { ...pairs_new};
	}


	let lc = {c: '', n: 1e200};
	let mc = {c: '', n: -1e200};
	for (let [c, n] of Object.entries(chars)) {
		if (n < lc.n) lc = {c: c, n: n};
		if (n > mc.n) mc = {c: c, n: n};
	}
	console.log('Part 2', mc.n-lc.n, Date.now() - start);
}
