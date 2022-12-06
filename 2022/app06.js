const fs = require('fs');

const data = fs.readFileSync('data06.txt').toString('utf8').split("");

const getPos = (n) => {
	let res = 0;
	while (true) {
		let conc = data.slice(res, res+n).filter((v, i, a) => a.indexOf(v) === i).length;
		if (conc === n) break;
		++res;
	}
	return res + n;
}

{
	console.log('Result 1', getPos(4));
}

{
	console.log('Result 2', getPos(14));
}
