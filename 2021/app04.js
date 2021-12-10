const fs = require('fs');

const data = fs.readFileSync('data_04.txt').toString('utf8').split("\n").map(n => n.trim());

let winnums = data.shift();
winnums = winnums.split(',').map(n => parseInt(n, 10));


const removenum = (n, boards) => {
	boards.forEach((board, bi) => {
		board.forEach((row, ri) => {
			row.forEach((num, ni) => {
				if (num === n) boards[bi][ri][ni] = null;
			})
		})
	})
}

const checkwin = (boards) => {
	let winners = [];
	boards.forEach((board, bi) => {
		for (let i = 0; i < board[0].length; i++) {
			let hasvalue = false;
			board.forEach(row => {
				if (row[i] !== null) hasvalue = true;
			});
			if (!hasvalue) winners.push(bi);
		}
		board.forEach(row => {
			let filtered = row.filter(n => n !== null);
			if (filtered.length === 0) winners.push(bi);
		});
	});
	return winners;
}

const sumnums = (board) => {
	let answer = 0;
	board.forEach(row => {
		row.forEach(num => answer += num);
	});
	return answer;
}

{
	let start = Date.now();
	let boards = [];
	let board = -1;
	data.forEach(row => {
		if (row === '') { ++board; boards[board] = []; return; }
		boards[board].push(row.split(/\ +/).map(n => parseInt(n, 10)));
	});
	let haswin = false;
	let winsum = false;
	winnums.map(winnum => {
		if (haswin) return;
		removenum(winnum, boards);
		let winners = checkwin(boards);
		if (winners.length > 0) {
			haswin = true;
			winsum = sumnums(boards[winners[0]]) * winnum;
		}
	});
	console.log('Part 1', winsum, Date.now()-start)
}



{
	let start = Date.now();
	let boards = [];
	let board = -1;
	data.forEach(row => {
		if (row === '') { ++board; boards[board] = []; return; }
		boards[board].push(row.split(/\ +/).map(n => parseInt(n, 10)));
	});
	let winners = 0;
	let winsum = false;
	let winboards = new Array(boards.length).fill(false);
	winnums.map(winnum => {
		removenum(winnum, boards);
		let lastnonwin = null;
		let winners = [...new Set(checkwin(boards))];
		if (winboards.filter(n => n === false).length === 1) {
			lastnonwin = winboards.findIndex(n => n === false);
		}
		winners.forEach(n => {
			winboards[n] = true;
		});
		if (lastnonwin !== null && winboards.filter(n => n === false).length === 0) {
			winsum = sumnums(boards[lastnonwin]) * winnum;
		}
	});
	console.log('Part 2', winsum, Date.now()-start)
}