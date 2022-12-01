const fs = require('fs');
const data = fs.readFileSync('data_22.txt').toString('utf8').split("\n");


let matrix;

const n = (num, limit) => {
	const l1 = -limit, l2 = limit;
	if (num < l1) return l1;
	if (num > l2) return l2;
	return num;
}

const swit = (dir, x0, x1, y0, y1, z0, z1, limit = 1e200) => {
	if (x0 > limit || y0 > limit || z0 > limit) return;
	if (x1 < -limit || y1 < -limit || z1 < -limit) return;
	for (let x = n(x0, limit); x <= n(x1, limit); x++) {
		for (let y = n(y0, limit); y <= n(y1, limit); y++) {
			for (let z = n(z0, limit); z <= n(z1, limit); z++) {
				let k = x+','+y+','+z;
				if (dir === 'off' && matrix[k]) delete matrix[k];
				else if (dir === 'on') matrix[k] = true;
			}
		}
	}
}

{
	let start = Date.now();
	matrix = {};
	const limit = 50;
	data.forEach(row => {
		if (!row) return;
		let m = row.match(/^([on|off]+).*=([0-9\-]+)\.\.([0-9\-]+).*=([0-9\-]+)\.\.([0-9\-]+).*=([0-9\-]+)\.\.([0-9\-]+)$/)
		swit(m[1], parseInt(m[2], 10), parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10), parseInt(m[6], 10), parseInt(m[7], 10), limit)
	});
	console.log('Part 1', Object.entries(matrix).length, Date.now() - start);
}


{
	let start = Date.now();
	matrix = {};
	data.forEach(row => {
		if (!row) return;
		let [all, dir, x0, x1, y0, y1, z0, z1] = row.match(/^([on|off]+).*=([0-9\-]+)\.\.([0-9\-]+).*=([0-9\-]+)\.\.([0-9\-]+).*=([0-9\-]+)\.\.([0-9\-]+)$/)
		console.log('Wprking on row ['+row+']');
		swit(dir, parseInt(x0, 10), parseInt(x1, 10), parseInt(y0, 10), parseInt(y1, 10), parseInt(z0, 10), parseInt(z1, 10))
	});
	console.log('Part 2', cnt(matrix), Date.now() - start);
}