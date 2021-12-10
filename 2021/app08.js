const fs = require('fs');

const data = fs.readFileSync('data_08.txt').toString('utf8').split("\n");


{
	let start = Date.now();
	let selnums = 0;
	data.forEach(row => {
		const [signals, nums] = row.split('|');
		nums.split(' ').forEach(num => {
			if (num.length === 2 || num.length === 3 || num.length === 4 || num.length === 7) selnums++;
		});
	});
	console.log('Part 1', selnums, Date.now() - start);
}

{
	let start = Date.now();
	const hasAll = (a1, a2) => {
		return a2.every(v => a1.includes(v));
	}
	const hasSome = (a1, a2, num = 1) => {
		let has = 0;
		a1.forEach(n => {
			if (a2.includes(n)) ++has;
		});
		return num === has;
	}
	let total_num = 0;

	data.forEach(row => {
		const [signals, nums] = row.split('|');
		let known_nums = new Array(9).fill('');
		let final_num = '';
		signals.split(' ').forEach(sig => {
			switch (sig.length) {
				case 2: // 1
					known_nums[1] = sig.split('');
					break;
				case 3: // 7
					known_nums[7] = sig.split('');
					break;
				case 4: // 4
					known_nums[4] = sig.split('');
					break;
				case 7: // 8
					known_nums[8] = sig.split('');
					break;
				default:
					break;
			}

		});
		nums.split(' ').forEach(num => {
			num = num.split('');
			switch (num.length) {
				case 2: // 1
					final_num += '1';
					break;
				case 3: // 7
					final_num += '7';
					break;
				case 4: // 4
					final_num += '4';
					break;
				case 7: // 8
					final_num += '8';
					break;
				case 5: // 2 || 3 || 5
					if (hasAll(num, known_nums[1])) final_num += '3';
					else if (hasSome(num, known_nums[4], 2)) final_num += '2';
					else final_num += '5';
					break;
				case 6: // 0 || 6 || 9
					if (hasAll(num, known_nums[7]) && hasSome(num, known_nums[8], 6) && hasSome(num, known_nums[4], 4)) final_num += '9';
					else if (hasSome(num, known_nums[1], 1)) final_num += '6';
					else final_num += '0';
					break;
				default:
					break;
			}
		});
		total_num += parseInt(final_num, 10);
	});
	console.log('Part 2', total_num, Date.now() - start);
}
