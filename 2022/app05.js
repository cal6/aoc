const fs = require('fs');

const [state, commands] = fs.readFileSync('data05.txt').toString('utf8').split("\n\n").map(r => r.split("\n"));

const getStacks = () => {
	let stacks = [];
	state.forEach((row, n) => {
		for (let m = 0, i = 0; m <= row.length; m += 4, i++) {
			let char = row.substr(m, 4).trim().replace('[', '').replace(']', '');
			if (!char) continue;
			if (!stacks[i]) stacks[i] = [];
			stacks[i].push(char);
		}
	});
	return stacks;
}

{
	let stacks = getStacks();
	commands.forEach((row, n) => {
		row = row.split(' ').map(n => parseInt(n, 10));
		for (let m = 1; m <= row[1]; m++)  stacks[row[5]-1].unshift(stacks[row[3]-1].shift());
	});
	let res = '';
	for (let i = 0; i < stacks.length; i++) { res += stacks[i][0]; }
	console.log('Result 1', res);
}


{
	let stacks = getStacks();
	commands.forEach((row, n) => {
		row = row.split(' ').map(n => parseInt(n, 10));
		let movestack = [];
		for (let m = 1; m <= row[1]; m++) {
			movestack.unshift(stacks[row[3]-1].shift());
		}
		movestack.forEach(s => stacks[row[5]-1].unshift(s));
	});
	let res = '';
	for (let i = 0; i < stacks.length; i++) { res += stacks[i][0]; }
	console.log('Result 2', res);
}