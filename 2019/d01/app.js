const fs = require('fs');

let sum = 0;

let input = fs.readFileSync('./input.txt').toString('utf8');
input = input.split("\n").filter(a => !!a);

const calcFuel = (mass) => {
	return Math.floor(parseInt(mass, 10) / 3) - 2;
};


input.forEach(subsum => {
	let it = 0;
	while ((subsum = calcFuel(subsum)) > 0) {
		console.log(it, subsum);
		sum += subsum;
		++it;
	}
});
console.log('all', sum)



