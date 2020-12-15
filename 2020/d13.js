const fs = require('fs');
let input = fs.readFileSync('input_13.txt').toString().split("\n");

part1: {
	let buses = input[1].split(',').filter(b => b !== 'x').map(n => parseInt(n, 10));
	let start_ts = ts = parseInt(input[0], 10);
	while (true) {
		for (let bus of buses) {
			if (ts % bus === 0) {
				console.log('part 1', ts, (ts-start_ts)*bus);
				break part1;
			}
		}
		++ts;
	}
}

part2: {
	let buses = input[1].split(',').map(n => parseInt(n, 10));
	let bus_count = buses.length - 1;
	let stepper = 1;
	const checkConstraint = (ts) => {
		let last_match = 0, last_bus = 0;
		for (let n = ts, i = 0; n <= ts + bus_count; n++, i++) {
			if (isNaN(buses[i])) continue;
			if (n % buses[i] !== 0) return {resolved: false, in_row: last_match, bus: last_bus};
			last_match = i+1; last_bus = buses[i];
		}
		return {resolved: true};
	}
	let ts = 0, max_in_row = 0;
	while (true) {
		let cs = checkConstraint(ts);
		if (cs.resolved) {
			console.log('part 2', ts);
			break;
		}
		if (ts > 0 && cs.in_row > max_in_row) { 
			stepper = stepper * cs.bus;
			max_in_row = cs.in_row; 
			console.log(stepper, ts, cs);
		}
		ts += stepper;
	}
}
