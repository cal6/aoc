const math = require('mathjs');
const fs = require('fs');
const instructions = fs.readFileSync('input_d15.txt').toString().split("\n");

const display = (m) => {
	for (var r = 0; r < m.length; ++r) {
		console.log('  '+m[r].join(' ')+"\n");
	}
}

const ingredients = [];
for (let instruction of instructions) {
	let [_, name, capacity, durability, flavor, texture, calories] = instruction.toLowerCase().match(/^([a-z]+): capacity ([0-9\-]+), durability ([0-9\-]+), flavor ([0-9\-]+), texture ([0-9\-]+), calories ([0-9\-]+)/);
	ingredients.push({name: name, capacity: parseInt(capacity, 10), durability: parseInt(durability, 10), flavor: parseInt(flavor, 10), texture: parseInt(texture, 10), calories: parseInt(calories, 10)});
}
let arr = [[], [], [], []];
let calories = [[]];
for (let ingredient of ingredients) {
	arr[0].push(ingredient.capacity);
	arr[1].push(ingredient.durability);
	arr[2].push(ingredient.flavor);
	arr[3].push(ingredient.texture);
	calories[0].push(ingredient.calories);
};
let matrix = math.matrix(arr);

const arraySum = (arr) => {
	let sum = 0;
	arr.map(n => sum += n);
	return sum;
}
const arrayMult = (arr) => {
	let mul = 1;
	arr.map(n => mul *= Math.max(n, 0));
	return mul;
}


let max_sum = 0, its = 0;
for (let a = 1; a <= 100; a++) {
	for (let b = 1; b <= 100; b++) {
		if (a + b > 98) { break; }
		for (let c = 1; c <= 100; c++) {
			if (a + b + c > 99) { break; }
			for (let d = 1; d <= 100; d++) {
				if (a + b + c + d < 100) { continue; }
				if (a + b + c + d > 100) { break; }
				++its;
				const i_multiplies = math.multiply(matrix, [a, b, c, d]);
				const c_multiplies = math.multiply(calories, [a, b, c, d]);
				const i_sum = arrayMult(i_multiplies.toArray());
				const c_sum = c_multiplies[0];
				if (i_sum > max_sum && c_sum === 500) {
					max_sum = i_sum;
					console.log(max_sum, c_sum, i_multiplies.toArray(), [a, b, c, d]);
				}
			}
		}
	}
}
console.log(max_sum, its);


