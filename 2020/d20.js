const fs = require('fs');
let input = fs.readFileSync('input_20.txt').toString().split("\n");
const rotateMatrix = require('rotate-matrix');

let tiles = new Map();

let c_tile, y = 0;
let max_x = input[1].length, max_y, isset = true, reftile;
for (let row of input) {
	if (!row) { max_y = y; continue; }
	if (row.startsWith('Tile')) {
		c_tile = parseInt(row.replace('Tile ', '').replace(':', ''), 10);
		tiles.set(c_tile, {tile: c_tile, x: isset ? 0 : null, y: isset ? 0 : null, isset: isset, pose: 0, image: [], sides: Array(8).fill('')});
		if (isset) { isset = false; }
		y = 0;
		continue;
	}
	let a_row = [];
	for (let x = 0; x < row.length; x++) {
		a_row.push((row[x] === '#'));
	}
	tiles.get(c_tile).image.push(a_row);
	++y;
}
const calculateSides = (content) => {
	content.sides = Array(8).fill('');
	for (let x = 0; x < max_x; x++) {
		content.sides[0] += content.image[0][x] ? '#' : '.';
		content.sides[4] += content.image[max_y-1][x] ? '#' : '.';
	}
	for (let y = 0; y < max_y; y++) {
		content.sides[2] += content.image[y][max_x-1] ? '#' : '.';
		content.sides[6] += content.image[y][0] ? '#' : '.';
	}
	content.sides[1] = content.sides[0].split('').reverse().join('');
	content.sides[3] = content.sides[2].split('').reverse().join('');
	content.sides[5] = content.sides[4].split('').reverse().join('');
	content.sides[7] = content.sides[6].split('').reverse().join('');
}

for (let [tile, content] of tiles) {
	calculateSides(content);
}

const flipMatrix = (matrix) => {
	for (let y = 0; y < matrix.length; y++) {
		matrix[y] = matrix[y].reverse();
	}
	return matrix;
}

const flopMatrix = (matrix) => {
	let new_matrix = [];
	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix.length; y++) {
			if (!new_matrix[y]) new_matrix[y] = [];
			new_matrix[y][x] = matrix[matrix.length-y-1][x];
		}
	}
	return new_matrix;
}

const drawImage = (matrix, strip, ret) => {
	let out = '';
	let coef = strip ? 1 : 0;
	for (let y = 0 + coef; y < matrix.length - coef; y++) {
		for (let x = 0 + coef; x < matrix[y].length - coef; x++) {
			out += matrix[y][x] ? '#' : '.';
		}
		out += "\n";
	}
	if (ret) return out;
	console.log(out)
}

const doNothing = () => {};

const rotateImage = (content, rp, p) => {
	if (rp === 0 && [0,1].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 2); }
	if (rp === 2 && [0,1].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 3); }
	if (rp === 6 && [0,1].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 1); }

	if (rp === 0 && [2,3].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 1); }
	if (rp === 2 && [2,3].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 2); }
	if (rp === 4 && [2,3].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 3); }

	if (rp === 2 && [4,5].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 1); }
	if (rp === 4 && [4,5].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 2); }
	if (rp === 6 && [4,5].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 3); }

	if (rp === 0 && [6,7].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 3); }
	if (rp === 4 && [6,7].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 1); }
	if (rp === 6 && [6,7].indexOf(p) > -1) { content.image = rotateMatrix(content.image, 2); }

	if (rp === 0 && p === 0) content.image = flipMatrix(content.image);
	if (rp === 0 && p === 2) content.image = flipMatrix(content.image);
	if (rp === 0 && p === 5) content.image = flipMatrix(content.image);
	if (rp === 0 && p === 7) content.image = flipMatrix(content.image);
	if (rp === 2 && p === 0) content.image = flopMatrix(content.image);
	if (rp === 2 && p === 2) content.image = flopMatrix(content.image);
	if (rp === 2 && p === 5) content.image = flopMatrix(content.image);
	if (rp === 2 && p === 7) content.image = flopMatrix(content.image);
	if (rp === 4 && p === 1) content.image = flipMatrix(content.image);
	if (rp === 4 && p === 3) content.image = flipMatrix(content.image);
	if (rp === 4 && p === 4) content.image = flipMatrix(content.image);
	if (rp === 4 && p === 6) content.image = flipMatrix(content.image);
	if (rp === 6 && p === 1) content.image = flopMatrix(content.image);
	if (rp === 6 && p === 3) content.image = flopMatrix(content.image);
	if (rp === 6 && p === 4) content.image = flopMatrix(content.image);
	if (rp === 6 && p === 6) content.image = flopMatrix(content.image);
	calculateSides(content);
	return content;
}

const calculateLoc = (x, y, s) => {
	let r_x = x, r_y = y;
	if (s === 0) r_y++;
	if (s === 2) r_x++;
	if (s === 4) r_y--;
	if (s === 6) r_x--;
	return [r_x, r_y];
}

let picture_min_x = 1e200, picture_max_x = -1e200;
let picture_min_y = 1e200, picture_max_y = -1e200;
let picture = [];
part1: {
	let corners = [];
	let p_processed;
	const drawPicture = () => {
		let tiles_array = [];
		tiles.forEach(t => tiles_array.push(t))
		corners = [];
		for (let p_y = picture_min_y; p_y <= picture_max_y; p_y++) {
			picture[p_y+Math.abs(picture_min_y)] = [];
			for (let p_x = picture_min_x; p_x <= picture_max_x; p_x++) {
				const tile = (tiles_array.find(a => a.x === p_x && a.y === p_y) || {tile: 'x'});
				const tile_id = tile.tile;
				picture[p_y+Math.abs(picture_min_y)][p_x+Math.abs(picture_min_x)] = tile_id;
				if (p_x === picture_min_x && p_y === picture_min_y) corners.push(tile_id);
				if (p_x === picture_max_x && p_y === picture_min_y) corners.push(tile_id);
				if (p_x === picture_min_x && p_y === picture_max_y) corners.push(tile_id);
				if (p_x === picture_max_x && p_y === picture_max_y) corners.push(tile_id);
			}
		}
	}
	while (true) {
		let processed = 0;
		for (let [reftile_name, reftile] of tiles) {
			if (reftile.x === null) continue;
			for (let ref_pose = 0; ref_pose < reftile.sides.length; ref_pose += 2) {
				let ref_side = reftile.sides[ref_pose];
				for (let [tile, content] of tiles) {
					if (content.isset) continue;
					for (let pose = 0; pose < content.sides.length; pose++) {
						const side = content.sides[pose];
						if (side === ref_side) {
							const [new_x, new_y] = calculateLoc(reftile.x, reftile.y, ref_pose);
							content.x = new_x; content.y = new_y;
							picture_min_x = Math.min(picture_min_x, new_x);
							picture_min_y = Math.min(picture_min_y, new_y);
							picture_max_x = Math.max(picture_max_x, new_x);
							picture_max_y = Math.max(picture_max_y, new_y);
							content.isset = true;
							content = rotateImage(content, ref_pose, pose);
							tiles.set(tile, content)
						}
					}
					++processed;
				}
			}
		}
		drawPicture();
		if (processed === 0) {
			break;
		}
		p_processed = processed;
	}
	let part1_answer = 1;
	for (let corner of corners) part1_answer *= corner;
	console.log('part 1', part1_answer)
}

part2: {
	let big_image = [];
	snake_size = [20, 3];
	const snake = [
		[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
		[true,false,false,false,false,true,true,false,false,false,false,true,true,false,false,false,false,true,true,true],
		[false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,true,false,false,false],
	];
	const countTrues = (matrix) => {
		let trues = 0;
		matrix.map(n => n.map(r => trues += r ? 1 : 0));
		return trues;
	}
	const checkSnake = (x, y, matrix) => {
		let has_snake = true;
		let arr = matrix.slice(y, y+3);
		let out = [];
		arr.map((b, i) => {
			out[i] = b.slice(x, x+20)
		});
		for (let y = 0; y < snake.length; y++) {
			for (let x = 0; x < snake[y].length; x++) {
				if (snake[y][x] && !out[y][x]) has_snake = false;
			}
		}
		return has_snake ? 1 : 0;
	}
	const countSeaSnake = (matrix) => {
		let sea_snakes = 0;
		for (let y = 0; y < matrix.length - 3; y++) {
			for (let x = 0; x < matrix[y].length - 20; x++) {
				sea_snakes += checkSnake(x, y, matrix);
			}
		}
		return sea_snakes;
	}
	const disableSnakeCells = (x, y, matrix) => {
		for (let y = 0; y < snake.length; y++) {
			for (let x = 0; x < snake[y].length; x++) {
				if (snake[y][x]) matrix[y][x] = false;
			}
		}
		return matrix;
	}
	const disableActiveCells = (matrix) => {
		for (let y = 0; y < matrix.length - 3; y++) {
			for (let x = 0; x < matrix[y].length - 20; x++) {
				if (checkSnake(x, y, matrix)) {
					matrix = disableSnakeCells(x, y, matrix);
				}
			}
		}
		return matrix;
	}
	const drawBigImage = (matrix) => {
		matrix = matrix || big_image;
		for (let y = 0; y < matrix.length; y++) {
			console.log((matrix[y]||[]).map(a => a ? '#' : '.').join(''));
		}
		console.log('')
	}
	let o_x = 0, o_y = 0;
	for (let p_y = 0; p_y < picture.length; p_y++) {
		for (let p_x = 0; p_x < picture[p_y].length; p_x++) {
			const image = flopMatrix(tiles.get(picture[p_y][p_x]).image);
			for (let y = 1; y < 9; y++) {
				if (!big_image[p_y*8+y-1]) big_image[p_y*8+y-1] = [];
				for (let x = 1; x < 9; x++) {
					big_image[p_y*8+y-1][p_x*8+x-1] = image[y][x];
				}
			}
		}
	}
	const processSnakes = (matrix) => {
		let snakes = 0;
		if (snakes = countSeaSnake(matrix)) {
			let sum = 0;
			matrix.map(row => row.map(i => sum += i ? 1 : 0));
			console.log('part 2', (sum - (snakes * 15)));
			process.exit();
		}
	}
	for (let i = 0; i < 4; i++) {
		let n_matrix = rotateMatrix(big_image, i);
		processSnakes(n_matrix);
		let fi_matrix = flipMatrix(n_matrix);
		processSnakes(fi_matrix);
		let fo_matrix = flipMatrix(n_matrix);
		processSnakes(fo_matrix);
		let fio_matrix = flipMatrix(fi_matrix);
		processSnakes(fio_matrix);
	}
}
