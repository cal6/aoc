const fs = require('fs');



const data = fs.readFileSync('data02.txt').toString('utf8').split("\n");

{
	let res = 0;
	data.forEach(row => {
		const [e, y] = row.split(' ');
		if (y === 'X') res += 1;
		if (y === 'Y') res += 2;
		if (y === 'Z') res += 3;
		if (e === 'A' && y === 'Y') res += 6;
		if (e === 'B' && y === 'Z') res += 6;
		if (e === 'C' && y === 'X') res += 6;
		if (e === 'A' && y === 'X') res += 3;
		if (e === 'B' && y === 'Y') res += 3;
		if (e === 'C' && y === 'Z') res += 3;
	});
	console.log('Result 1', res);
}


{
	let res = 0;
	data.forEach(row => {
		const [e, y] = row.split(' ');
		if (e === 'A' && y === 'Z') res += 6 + 2;
		else if (e === 'B' && y === 'Z') res += 6 + 3;
		else if (e === 'C' && y === 'Z') res += 6 + 1;
		else if (e === 'A' && y === 'Y') res += 3 + 1;
		else if (e === 'B' && y === 'Y') res += 3 + 2;
		else if (e === 'C' && y === 'Y') res += 3 + 3;
		else if (e === 'A' && y === 'X') res += 0 + 3;
		else if (e === 'B' && y === 'X') res += 0 + 1;
		else if (e === 'C' && y === 'X') res += 0 + 2;
	});
	console.log('Result 2', res);
}