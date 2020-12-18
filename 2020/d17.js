const fs = require('fs');
let input = fs.readFileSync('input_17.txt').toString().split("\n");

let cube = new Map();
let min_x, min_y, min_z, min_w;
let max_x, max_y, max_z, max_w;
const resetCube = () => {
	cube = new Map()
	min_x = 0; min_y = 0; min_z = 0; min_w = 0;
	max_x = input[0].length-1; max_y = input.length-1; max_z = 0; max_w = 0;
	for (let y in input) {
		const pcs = input[y].split('');
		for (let x in pcs) {
			cube.set(x+','+y+',0', (pcs[x] === '#'));
			cube.set(x+','+y+',0,0', (pcs[x] === '#'));
		}
	}
}

part1: {
	resetCube();
	const countNeighbours = (cube, ix, iy, iz) => {
		let neighbours = 0;
		let it = 0;
		for (let x = ix-1; x <= ix+1; x++) {
			for (let y = iy-1; y <= iy+1; y++) {
				for (let z = iz-1; z <= iz+1; z++) {
					if (z === iz && x === ix && y === iy) continue;
					if (cube.get(x+','+y+','+z)) ++neighbours;
				}
			}
		}
		return neighbours;
	}
	const drawCube = (cube, i) => {
		console.log('Iteration=',i);
		let out = '';
		for (let z = min_z; z <= max_z; z++) {
			for (let y = min_y; y <= max_y; y++) {
				for (let x = min_x; x <= max_x; x++) {
					out += cube.get(x+','+y+','+z) ? '#' : '.';
				}
				out += "\n";
			}
			console.log('z='+z);
			console.log(out);
			out = '';
		}
	}
	for (let i = 0; i < 6; i++) {
		min_x--; min_y--; 
		max_x++; max_y++;
		min_z--; max_z++;
		let p_cube = new Map(cube);
		cube = new Map();
		for (let x = min_x; x <= max_x; x++) {
			for (let y = min_y; y <= max_y; y++) {
				for (let z = min_z; z <= max_z; z++) {
					let neighbours = countNeighbours(p_cube, x, y, z);
					if (p_cube.get(x+','+y+','+z) && (neighbours === 2 || neighbours === 3)) cube.set(x+','+y+','+z, true);
					else if (!p_cube.get(x+','+y+','+z) && (neighbours === 3)) cube.set(x+','+y+','+z, true);
					else cube.delete(x+','+y+','+z);
				}
			}
		}
	}
	console.log('part 1', cube.size);
}

part2: {
	resetCube();
	const countNeighbours = (cube, ix, iy, iz, iw) => {
		let neighbours = 0;
		let it = 0;
		for (let x = ix-1; x <= ix+1; x++) {
			for (let y = iy-1; y <= iy+1; y++) {
				for (let z = iz-1; z <= iz+1; z++) {
					for (let w = iw-1; w <= iw+1; w++) {
						if (z === iz && x === ix && y === iy && w === iw) continue;
						if (cube.get(x+','+y+','+z+','+w)) ++neighbours;
					}
				}
			}
		}
		return neighbours;
	}
	const drawCube = (cube, i, w) => {
		console.log('iteration=',i);
		let out = '';
		for (let z = min_z; z <= max_z; z++) {
			for (let y = min_y; y <= max_y; y++) {
				for (let x = min_x; x <= max_x; x++) {
					out += cube.get(x+','+y+','+z) ? '#' : '.';
				}
				out += "\n";
			}
			console.log('z='+z+';w='+w);
			console.log(out);
			out = '';
		}
	}
	for (let i = 0; i < 6; i++) {
		min_x--; min_y--; 
		max_x++; max_y++;
		min_z--; max_z++;
		min_w--; max_w++;
		let p_cube = new Map(cube);
		cube = new Map();
		for (let w = min_w; w <= max_w; w++) {
			for (let x = min_x; x <= max_x; x++) {
				for (let y = min_y; y <= max_y; y++) {
					for (let z = min_z; z <= max_z; z++) {
						let neighbours = countNeighbours(p_cube, x, y, z, w);
						if (p_cube.get(x+','+y+','+z+','+w) && (neighbours === 2 || neighbours === 3)) cube.set(x+','+y+','+z+','+w, true);
						else if (!p_cube.get(x+','+y+','+z+','+w) && (neighbours === 3)) cube.set(x+','+y+','+z+','+w, true);
						else cube.delete(x+','+y+','+z+','+w);
					}
				}
			}
		}
	}
	console.log('part 2', cube.size);
}
