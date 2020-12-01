const fs = require('fs');

let planets = fs.readFileSync('input.txt').toString('utf8').split("\n").map(planet => {
	const split = planet.match(/^\<x=([0-9\-]+)\, y=([0-9\-]+)\, z=([0-9\-]+)\>$/);
	return {p: [parseInt(split[1], 10), parseInt(split[2], 10), parseInt(split[3], 10)], v: [0, 0, 0]};
});

const get_rows = () => {
	let r_rows = [];
	for (let i = 0; i <= 2; i++) {
		r_rows[i] = planets.map(p => { return p.p[i] + ';' + p.v[i]; }).join(';') + ';';
	}
	return r_rows;
};
const rows = get_rows();
console.log(rows);

let combinations = [];
for (let x = 0; x < planets.length-1; x++) {
	for (let y = x+1; y < planets.length; y++) {
		if (x !== y) { combinations.push([x, y]); }
	}
}

const find_match = (i, it = -1, min_it = 0) => {
	// console.log('~~ Start iterating over ['+i+']');
	while (true) {
		it++;
		let updates = [];
		combinations.forEach(combination => {
			let planet = planets[combination[0]];
			let neighbour = planets[combination[1]];
			let update1 = updates[combination[0]] || [planet.v[0], planet.v[1], planet.v[2]];
			let update2 = updates[combination[1]] || [neighbour.v[0], neighbour.v[1], neighbour.v[2]];
			if (planet.p[i] < neighbour.p[i]) { update1[i]++; update2[i]--; }
			if (planet.p[i] > neighbour.p[i]) { update1[i]--; update2[i]++; }
			updates[combination[0]] = update1;
			updates[combination[1]] = update2;
		});
		if (it < min_it) {
			planets.forEach((planet, idx) => {
				planet.v[i] = updates[idx][i];
				planet.p[i] += planet.v[i];
			});
		} else {
			let result = '';
			planets.forEach((planet, idx) => {
				planet.v[i] = updates[idx][i];
				planet.p[i] += planet.v[i];
				result += planet.p[i] + ';' + planet.v[i] + ';';
			});
			if (result === rows[i]) { 
				break; 
			}
		}
	}
	return it;
};

let m1 = 0, m2 = 0, m3 = 0;
let r1 = find_match(0)+1;
let r2 = find_match(1)+1;
let r3 = find_match(2)+1;
const start = Date.now();
let iit = 0;
while (true) {
	++iit;
	m1 += r1;
	while (m2 < m1) m2 += r2;
	while (m3 < m2) m3 += r3;
	if (iit % 10000000 === 0)
		console.log(m1, m2, m3, '@ ' + (Date.now()-start));
	if (m1 === m2 && m2 === m3) {
		console.log('Perfect match at ['+m1+']');
		break;
	}
}
/*

let m1 = 0, m2 = 0, m3 = 0;
const start = Date.now();
while (true) {
	m1 = find_match(0, m1, Math.max(m2, m3));
	while (m2 < m1) m2 = find_match(1, m2, Math.max(m1, m3));
	while (m3 < m2) m3 = find_match(2, m3, Math.max(m1, m2));
	console.log(m1, m2, m3, '@ ' + (Date.now()-start));
	if (m1 === m2 && m2 === m3) {
		console.log('Perfect match at ['+m1+']');
		break;
	}
}

return; 

while (true) {
	let updates = [];
	const hash = crypto.createHash('md5').update(JSON.stringify(planets)).digest("hex");
	if (hash === starthash && it > 0) { console.log('Found history at ['+it+']'); break;  }
	planets.forEach((planet, idx1) => {
		updates[idx1] = planet.v.slice(0);
		for (let i = 0; i <= 2; i++) {
			planets.forEach((neighbour, idx2) => {
				if (idx1 === idx2) { return; }
				if (planet.p[i] < neighbour.p[i]) { updates[idx1][i]++; }
				if (planet.p[i] > neighbour.p[i]) { updates[idx1][i]--; }
			});
		}
	});
	planets.forEach((planet, idx) => {
		planet.v = updates[idx];
		for (let i = 0; i <= 2; i++) {
			planet.p[i] += planet.v[i];
		}
	});

	++it;
	if (it % 100000 === 0) { console.log('... ', it); console.log(planets); };
}

*/