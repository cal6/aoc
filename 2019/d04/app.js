const checkconstraints = (arr) => {
	if (arr.join('') !== arr.sort().join('')) return false;
	let carr = {}
	for (let i = 0; i < 6; i++) {
		if (!carr[arr[i]]) carr[arr[i]] = 0;
		++carr[arr[i]];
	}
	let has2 = false;
	for (cnt in carr) { if (carr[cnt] === 2) has2 = true; }
	return has2;
}

const num2arr = (num) => {
	let arr = num.toString().split("").map(a => parseInt(a, 10));
	for (let i = arr.length; i < 6; i++) {
		arr.unshift(0);
	}
	return arr;
}

let potentials = 0;
for (let i = 152085; i <= 670283; i++) {
	const arrnum = num2arr(i);
	if (checkconstraints(arrnum)) { ++potentials; }
}
console.log(potentials);