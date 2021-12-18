const fs = require('fs');

const data = fs.readFileSync('data_18.txt').toString('utf8').split("\n");

const add = (a1, a2) => {
	return [a1, a2];
}

const checkSum = (sum) => {
	if (sum < 10) return sum;
	sum = sum/2
	return '['+Math.floor(sum)+','+Math.ceil(sum)+']';
}

const expl = (a) => {
	let s = JSON.stringify(a, '', '');
	while (true) {
		let cnt = 0;
		let start = end = -1;
		s.split('').forEach((c, i) => {
			if (end > -1) return;
			if (c === '[') ++cnt;
			if (c === ']') --cnt;
			if (cnt >= 5 && end < 0 && c === '[') start = i;
			if (start > -1 && end < 0 && c === ']') end = i+1;
		});
		if (start === -1) {
			let c = false;
			[c, s] = splt(s);
			if (!c) break;
			continue;
		};

		// Regex magic
		let nums = s.substr(start, end-start);
		let p1 = s.substr(0, start)
		let p2 = s.substr(end);
		nums = eval(nums);
		if (p1.match(/.*(?:\D|^)(\d+)/) !== null) {
			let num = parseInt(p1.match(/[0-9]+(?!.*[0-9])/)[0], 10);
			let sum = num + nums[0];
			p1 = p1.replace(/[0-9]+(?!.*[0-9])/, sum);
		}
		if (p2.match(/[0-9]+/)) {
			let num = parseInt(p2.match(/[0-9]+/)[0], 10);
			let sum = num + nums[1];
			p2 = p2.replace(/[0-9]+/, sum);
		}
		s = p1+'0'+p2;
	}
	return eval(s);
}

const splt = (s) => {
	const match = s.match(/[0-9]{2,}/);
	if (match) {
		num = parseInt(match[0], 10);
		s = s.replace(num, '['+Math.floor(num/2)+','+Math.ceil(num/2)+']');
	}
	return [!!match, s];
}

const sum = (a) => {
	let s = JSON.stringify(a, '', '');
	while (true) {
		let cnt = 0;
		let start = end = -1;
		s.split('').forEach((c, i) => {
			if (end > -1) return;
			if (c === '[') ++cnt;
			if (c === ']') --cnt;
			if (end < 0 && c === '[') start = i;
			if (start > -1 && end < 0 && c === ']') end = i+1;
		});
		if (start < 0) break;
		let nums = eval(s.substr(start, end-start));
		let p1 = s.substr(0, start)
		let p2 = s.substr(end);
		let sum = nums[0]*3 + nums[1]*2;
		s = p1 + sum + p2;
	}
	return s;
}

{
	let start = Date.now();
	let a;
	data.forEach(row => {
		row = eval(row);
		a = a ? add(a, row) : row;
		a = expl(a);
	});
	const magnitude = sum(a);
	console.log('Part 1', magnitude, Date.now() - start);
}


{
	let start = Date.now();
	let biggest_sum = 0;
	let rows = [];
	data.forEach(row => {
		rows.push(eval(row));
	});
	for (let i = 0; i < rows.length-1; i++) {
		for (let j = i+1; j < rows.length; j++) {
			let a = sum(expl(add(rows[i], rows[j])));
			biggest_sum = Math.max(a, biggest_sum);
		}
	}
	console.log('Part 2', biggest_sum, Date.now() - start);
}
