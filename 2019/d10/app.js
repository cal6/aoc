const fs = require('fs');

const rows = fs.readFileSync('input.txt').toString('utf8').split("\n");

let matrix = {}, filled = {};
rows.forEach((row, ridx) => {
	row = row.split("");
	row.forEach((col, cidx) => {
		const key = cidx+','+ridx;
		matrix[key] = col === '#';
		if (col === '#') {
			filled[key] = 0;
		}
	});
});

const get_distance = (a, b) => {
	return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

const is_in_line = (a, b, c) => {
	const distance1 = get_distance(a, c);
	const distance2 = get_distance(a, b);
	const distance3 = get_distance(b, c);
	const inway = (Math.round((distance2 + distance3) * 1000000) === Math.round(distance1 * 1000000))
	// console.log(a, b, c, distance1, distance2, distance3, Math.round((distance2 + distance3) * 10000), Math.round(distance1 * 10000));
	return inway;
};
/*
for (let coord in filled) {
	const p1 = coord.split(',').map(a => parseInt(a, 10));
	for (let meteor in filled) {
		if (coord === meteor) { continue; }
		const p3 = meteor.split(',').map(a => parseInt(a, 10));
		let inway = false;
		for (let inway_meteor in filled) {
			if (meteor === inway_meteor) { continue; }
			if (coord === inway_meteor) { continue; }
			if (inway) { continue; }
			const p2 = inway_meteor.split(',').map(a => parseInt(a, 10));
			inway = is_in_line(p1, p2, p3);
			// console.log(coord, meteor, inway_meteor, p1, p2, p3, inway);

		}
		if (!inway) { 
			filled[coord]++;
			// console.log('['+coord+'] can see ['+meteor+']');
		}
	}
}

let max_asteroids = -1, max_coords;
for (let coord in filled) {
	if (filled[coord] > max_asteroids) {
		max_asteroids = filled[coord];
		max_coords = coord;
	}
}
console.log(max_coords, max_asteroids);
*/

delete filled['26,29'];
const cannon = [26,29];
let destroyed = 0;

const find_min_positive_angle = (threshold = 0) => {
	let min_angle = 1e200, min_distance = 1e200, best_coord;
	for (let coord in filled) {
		coord = coord.split(',').map(a => parseInt(a, 10));
		let angle = Math.round(Math.atan2(coord[0] - cannon[0], -(coord[1] - cannon[1])) * 10000);
		if (angle < 0) { angle += 2 * Math.PI * 10000; }
		const distance = get_distance(coord, cannon);
		if (angle >= threshold && angle <= min_angle) {
			if (angle === min_angle) {
				min_distance = distance;
			} else {
				min_distance = 1e200;
			}
			min_angle = angle;
			best_coord = coord;
		}
	}
	const destroyed_coords = best_coord.join(',')
	delete filled[destroyed_coords];
	console.log(destroyed, best_coord, min_distance, min_angle);
	return min_angle;

}

let threshold = -1;
while (true) {
	threshold = find_min_positive_angle(threshold + 1);
	destroyed++;
	if (destroyed === 200) { break; }
}






