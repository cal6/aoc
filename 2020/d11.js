const fs = require('fs');
let table = fs.readFileSync('input_11.txt').toString().split("\n");
let max_x = table[0].length - 1;
let max_y = table.length;
let matrix = {};
const resetMatrix = () => {
	matrix = {};
	for (let y in table) {
		const row = table[y].split('');
		for (let x in row) {
			if (row[x] === 'L') matrix[x+','+y] = false;
			if (row[x] === '#') matrix[x+','+y] = true;
		}
	}
}

part1: {
	resetMatrix();
	let p_matrix = {};
	const alter = () => {
		p_matrix = JSON.parse(JSON.stringify(matrix));
		for (let x = 0; x <= max_x; x++) {
			for (let y = 0; y <= max_y; y++) {
				const coords = x+','+y;
				if (typeof p_matrix[coords] === 'undefined') { continue; }
				let occupieds = 0;
				for (let cx = Math.max(x-1, 0); cx <= Math.min(x+1, max_x); cx++) {
					for (let cy = Math.max(y-1, 0); cy <= Math.min(y+1, max_y); cy++) {
						if (x === cx && y === cy) { continue; }
						if (p_matrix[cx+','+cy] === true) occupieds++;
					}
				}
				if (p_matrix[coords] && occupieds >= 4) matrix[coords] = false;
				else if (!p_matrix[coords] && occupieds === 0) matrix[coords] = true;
				else matrix[coords] = p_matrix[coords];
			}
		}
	}
	while (true) {
		alter();
		if (JSON.stringify(p_matrix) === JSON.stringify(matrix)) {
			let occupied = 0;
			for (let coord in matrix) {
				if (matrix[coord]) occupied++;
			}
			console.log('part 1', occupied);
			break part1;
		}
	}
}

part2: {
	resetMatrix();
	let p_matrix = {};
	const countOccupieds = (x, y) => {
		let occupieds = 0;
		for (let cx = x-1; cx >= 0; cx--) {
			if (typeof p_matrix[cx+','+y] !== 'undefined') {
				if (p_matrix[cx+','+y]) ++occupieds;
				break;
			}
		}
		for (let cx = x+1; cx <= max_x; cx++) {
			if (typeof p_matrix[cx+','+y] !== 'undefined') {
				if (p_matrix[cx+','+y]) ++occupieds;
				break;
			}
		}
		for (let cy = y-1; cy >= 0; cy--) {
			if (typeof p_matrix[x+','+cy] !== 'undefined') {
				if (p_matrix[x+','+cy]) ++occupieds;
				break;
			}
		}
		for (let cy = y+1; cy <= max_y; cy++) {
			if (typeof p_matrix[x+','+cy] !== 'undefined') {
				if (p_matrix[x+','+cy]) ++occupieds;
				break;
			}
		}
		for (let cx = x-1, cy = y-1; cx >= 0 && cy >= 0; cx--, cy--) {
			if (typeof p_matrix[cx+','+cy] !== 'undefined') {
				if (p_matrix[cx+','+cy]) ++occupieds;
				break;
			}
		}
		for (let cx = x-1, cy = y+1; cx >= 0 && cy <= max_y; cx--, cy++) {
			if (typeof p_matrix[cx+','+cy] !== 'undefined') {
				if (p_matrix[cx+','+cy]) ++occupieds;
				break;
			}
		}
		for (let cx = x+1, cy = y+1; cx <= max_x && cy <= max_y; cx++, cy++) {
			if (typeof p_matrix[cx+','+cy] !== 'undefined') {
				if (p_matrix[cx+','+cy]) ++occupieds;
				break;
			}
		}
		for (let cx = x+1, cy = y-1; cx <= max_x && cy >= 0; cx++, cy--) {
			if (typeof p_matrix[cx+','+cy] !== 'undefined') {
				if (p_matrix[cx+','+cy]) ++occupieds;
				break;
			}
		}
		return occupieds;
	}
	const printMatrix = () => {
		let output = '';
		for (let y = 0; y <= max_y; y++) {
			for (let x = 0; x <= max_x; x++) {
				output += typeof matrix[x+','+y] === 'undefined' ? '.' : matrix[x+','+y] ? '#' : 'L';
			}
			output += "\n";
		}
		console.log(output);
	}
	const alter = () => {
		pp_matrix = JSON.parse(JSON.stringify(p_matrix));
		p_matrix = JSON.parse(JSON.stringify(matrix));
		for (let x = 0; x <= max_x; x++) {
			for (let y = 0; y <= max_y; y++) {
				const coords = x+','+y;
				if (typeof p_matrix[coords] === 'undefined') { continue; }
				let occupieds = countOccupieds(x, y);
				if (p_matrix[coords] && occupieds >= 5) matrix[coords] = false;
				else if (!p_matrix[coords] && occupieds === 0) matrix[coords] = true;
				else matrix[coords] = p_matrix[coords];
			}
		}
	}
	while (true) {
		printMatrix();
		alter();
		if (JSON.stringify(p_matrix) === JSON.stringify(matrix)) {
			let occupied = 0;
			for (let coord in matrix) {
				if (matrix[coord]) occupied++;
			}
			console.log('part 2', occupied);
			break;
		}
	}
}