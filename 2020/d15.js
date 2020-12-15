// let input = '0,3,6'.split(",").map(n => parseInt(n, 10));
let input = '19,20,14,0,9,1'.split(",").map(n => parseInt(n, 10));

const solve = (needednums) => {
	let numbers = new Map();
	let i = 1;
	const checkNumber = (num) => {
		if (!numbers.has(num)) {
			numbers.set(num, i);
			return 0;
		}
		const dif = i - numbers.get(num);
		numbers.set(num, i);
		return dif;
	}
	let nextnumber;
	for (const num of input) {
		nextnumber = checkNumber(num);
		++i
	}
	for (; i < needednums; i++) {
		nextnumber = checkNumber(nextnumber);
	}
	return nextnumber;
}

console.log('part 1', solve(2020));
console.log('part 2', solve(30000000));

