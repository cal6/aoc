const fs = require('fs');

const data = fs.readFileSync('data08.txt').toString('utf8').split("\n").map(r => r.split('').map(n => parseInt(n, 10)));
const max_y = data.length - 1;
const max_x = data[0].length - 1;

const checkVisible = (x, y, n = false) => {
	const spot = data[x][y];
	let vx1 = 0, vx2 = 0, vy1 = 0, vy2 = 0;
	let hx1 = true, hx2 = true, hy1 = true, hy2 = true;
	for (let ix = x-1; ix >= 0; ix--) { if (hx1) { if (data[ix][y] >= spot) { ix = -1e200; hx1 = false; } vx1++; } } 
	for (let ix = x+1; ix <= max_x; ix++) { if (hx2) { if (data[ix][y] >= spot) { ix = 1e200; hx2 = false; } vx2++; } }
	for (let iy = y-1; iy >= 0; iy--) { if (hy1) { if (data[x][iy] >= spot) { iy = -1e200; hy1 = false; } vy1++; } }
	for (let iy = y+1; iy <= max_y; iy++) { if (hy2) { if (data[x][iy] >= spot) { iy = 1e200; hy2 = false; } vy2++;  } }
	if (n) {
		return vx1 * vx2 * vy1 * vy2;
	}
	return hx1 === true || hx2 === true || hy1 === true || hy2 === true;
}

{
	let res = 0;
	data.map((row, my) => {
		row.map((col, mx) => {
			if (checkVisible(mx, my)) res++;
		});
	});
	console.log('Result 1', res);
}


{
	let res = 0;
	data.map((row, my) => {
		row.map((col, mx) => {
			res = Math.max(checkVisible(mx, my, true), res);
		});
	});
	console.log('Result 2', res);
}