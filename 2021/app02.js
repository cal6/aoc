const fs = require('fs');

const data = fs.readFileSync('data_02.txt').toString('utf8').split("\n");

{
	let x = 0;
	let z = 0;

	data.forEach(row => {
		const [dir, num] = row.split(' ');
		switch (dir) {
			case 'forward': x += parseInt(num, 10); break;
			case 'up': z -= parseInt(num, 10); break;
			case 'down': z += parseInt(num, 10); break;
			default: console.log('!!!', dir)
		}
	});
	console.log('part 1', x*z);
}



{
	let x = 0;
	let z = 0;
	let aim = 0;

	data.forEach(row => {
		const [dir, num] = row.split(' ');
		switch (dir) {
			case 'forward': x += parseInt(num, 10) * aim; z += parseInt(num, 10); break;
			case 'up': aim -= parseInt(num, 10); break;
			case 'down': aim += parseInt(num, 10); break;
			default: console.log('!!!', dir)
		}
	});
	console.log('part 2', x, z, aim, x*z);
}