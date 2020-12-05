const fs = require('fs');
const input = fs.readFileSync('input_05.txt').toString().split("\n");

const getRow = (str) => {
	let rows = [...Array(128).keys()];
	for (const d of str) {
		if (d === 'F') { rows = rows.slice(0, rows.length / 2); }
		if (d === 'B') { rows = rows.slice(rows.length / 2, rows.length); }
	}
	return rows[0]
}

const getSeat = (str) => {
	let seats = [...Array(8).keys()];
	for (const d of str) {
		if (d === 'L') { seats = seats.slice(0, seats.length / 2); }
		if (d === 'R') { seats = seats.slice(seats.length / 2, seats.length); }
	}
	return seats[0];
}

let ids = [];

part1: {
	let max_id = 0;
	for (const ticket of input) {
		const row = getRow(ticket.substr(0, 7));
		const seat = getSeat(ticket.substr(7));
		const id = row * 8 + seat;
		ids.push(id)
	}
	console.log('match part 1', ids.sort((a, b) => a > b ? -1 : 1)[0]);
}


part2: {
	for (let it = 1; it < ids.length - 2; ++it) {
		if (ids[it] === ids[it + 1] + 2) {
			console.log('match part 2', ids[it]-1);
			break;
		}
	}
}
