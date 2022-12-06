const fs = require('fs');

const data = fs.readFileSync('data06.txt').toString('utf8').split("");

const getPos = (n, s = 0) => {
	while (data.slice(s, s+n).filter((v, i, a) => a.indexOf(v) === i).length !== n) { ++s; }
	return s + n;
}

{
	console.log('Result 1', getPos(4));
}

{
	console.log('Result 2', getPos(14));
}
