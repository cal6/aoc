const fs = require('fs');

const data = fs.readFileSync('data_03.txt').toString('utf8').split("\n");
const bit_num = data[0].length;

{
	let sums = new Array(bit_num).fill(0);
	let gamma = '';
	let sigma = '';

	data.forEach(row => {
		const bits = row.split('').map(n => parseInt(n, 10));
		for (let i = 0; i < bit_num; i++) sums[i] += bits[i]
	});
	for (let i = 0; i < bit_num; i++) {
		gamma += sums[i] > (data.length - 1) / 2 ? '1' : '0';
		sigma += sums[i] > (data.length - 1) / 2 ? '0' : '1';
	}

	console.log('part 1', parseInt(gamma, 2) * parseInt(sigma, 2));
}



{
	let remining_up = [...data];
	let remining_down = [...data];
	for (let current_bit = 0; current_bit < bit_num; current_bit++) {
		let sum_up = 0;
		if (remining_up.length > 1) {
			remining_up.forEach(row => {
				const bits = row.split('').map(n => parseInt(n, 10));
				sum_up += parseInt(row[current_bit], 10);
			});
			let filter_up = (sum_up > (remining_up.length - 1) / 2) ? '1' : '0';
			remining_up = remining_up.filter(r => r[current_bit] === filter_up.toString());
		}
		let sum_down = 0;
		if (remining_down.length > 1) {
			remining_down.forEach(row => {
				const bits = row.split('').map(n => parseInt(n, 10));
				sum_down += parseInt(row[current_bit], 10);
			});
			let filter_down = (sum_down > (remining_down.length - 1) / 2) ? '0' : '1';
			remining_down = remining_down.filter(r => r[current_bit] === filter_down.toString());
		}
	}
	console.log('part 2', parseInt(remining_up[0], 2) * parseInt(remining_down[0], 2));
}