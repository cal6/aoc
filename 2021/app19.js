const fs = require('fs');
const { Vector3, Transform, Quaternion } = require('math3d');

const data = fs.readFileSync('data_19.txt').toString('utf8').split("\n");

const rotate = (m, x, y, z) => {
	m = m.slice(0);
	let n = [];
	m.forEach(v => {
		let np = Quaternion.Euler(x, y, z).mulVector3(v); 
		n.push(new Vector3(Math.round(np.x), Math.round(np.y), Math.round(np.z)));
	});
	return n;
}

const shift = (m, x, y, z) => {
	m = m.slice(0);
	let n = [];
	m.forEach(v => {
		n.push(v.add(new Vector3(x, y, z)));
	});
	return n;
}

const calcDistances = (a1, a2) => {
	let distances = {};
	a1.forEach(v1 => {
		let matches = 0;
		a2.forEach(v2 => {
			const shift = v1.sub(v2);
			const key = Math.round(shift.x)+','+Math.round(shift.y)+','+Math.round(shift.z);
			if (!distances[key]) distances[key] = 0;
			++distances[key];
		});
	});
	let winner = Object.entries(distances).sort((a, b) => a[1] > b[1] ? -1 : 1)[0];
	const p = winner[0].split(',');
	const shift = new Vector3(parseInt(p[0], 10), parseInt(p[1], 10), parseInt(p[2]), 10);
	return [winner[1], shift];
}

const merge = (m, m2, h) => {
	let has = m.map(v => v.toString());
	m2.forEach(v => {
		const nv = v.add(h);
		if (has.indexOf(nv.toString()) < 0) {
			m.push(nv);
			has.push(nv.toString());
		}
	});
	return m;
}

let mastermatrix;
let shifts = [new Vector3(0, 0, 0)];

{
	let start = Date.now();
	let matrixes = [];
	let array;
	data.forEach(row => {
		if (!row) return;
		if (row.startsWith('---')) {
			if (array) matrixes.push(array);
			array = [];
		} else {
			array.push(new Vector3(...row.split(',').map(n => parseInt(n, 10))));
		}
	});
	matrixes.push(array);
	
	mastermatrix = matrixes.shift();

	for (let i = 0; i < matrixes.length; i++) {
		let cmatrix = matrixes[i];
		let max_matchings = 0;
		let rotation, shift;
		for (let x = 0; x < 360; x += 90) {
			if (max_matchings >= 12) break;
			for (let y = 0; y < 360; y += 90) {
				if (max_matchings >= 12) break;
				for (let z = 0; z < 360; z += 90) {
					if (max_matchings >= 12) break;
					let matchings = {};
					const [i_max_matchings, i_shift] = calcDistances(mastermatrix, rotate(cmatrix, x, y, z));
					if (i_max_matchings > max_matchings) {
						max_matchings = i_max_matchings;
						rotation = [x, y, z];
						shift = i_shift;
					}
				}
			}
		}
		if (max_matchings >= 12) {
			mastermatrix = merge(mastermatrix, rotate(cmatrix, rotation[0], rotation[1], rotation[2]), shift);
			matrixes.splice(i, 1);
			shifts.push(shift);
			i = -1;
		}
	}
	console.log('Part 1', mastermatrix.length, Date.now() - start);
}

const manhattan = () => {
	let max_distance = 0;
	for (let i = 0; i < shifts.length; i++) {
		for (let j = 1; j < shifts.length; j++) {
			const distance = Math.abs(shifts[i].x - shifts[j].x) + Math.abs(shifts[i].y - shifts[j].y) + Math.abs(shifts[i].z - shifts[j].z);
			max_distance = Math.max(max_distance, distance);
		}
	}
	return max_distance;
}


{
	let start = Date.now();
	let max = manhattan();
	console.log('Part 2', max, Date.now() - start);
}
