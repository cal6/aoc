const fs = require('fs');
const data = fs.readFileSync('data_17.txt').toString('utf8');

const move = (pos, step, velocity) => {
	let ret = [];
	ret[0] = pos[0] + Math.max(0, velocity[0] - step);
	ret[1] = pos[1] + velocity[1] - step;
	return ret;
}

const check = (pos) => {
	if (pos[0] < square[0][0] || pos[1] > square[0][1]) return -1;
	if (pos[0] > square[1][0] || pos[1] < square[1][1]) return 1;
	return 0;
}

const row = data.match(/[\-[0-9]+/g);
const square = [[row[0], row[3]], [row[1], row[2]]];
console.log(square);

{
	let start = Date.now();
	let max_y = -1e200;
	let sum = 0;
	let best;
	for (let x = 1; x < 100; x++) {
		for (let y = -1000; y < 1000; y++) {
			let pos = [0, 0];
			let tmp_max_y = -1e200;
			for (let step = 0; step < 1000; step++) {
				pos = move(pos, step, [x, y]);
				tmp_max_y = Math.max(tmp_max_y, pos[1]);
				const chk = check(pos);
				if (chk === 0) {
					if (max_y < tmp_max_y) {
						max_y = tmp_max_y;
						best = [x, y];
					}
					sum++;
					break;
				}
				if (chk === 1) break;
			}
		}
	}
	console.log('Part 1', best, max_y, Date.now() - start);
	console.log('Part 2', sum, Date.now() - start);
}
