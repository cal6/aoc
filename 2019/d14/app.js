const fs = require('fs');
const inspect = require('util').inspect;

const input = fs.readFileSync('input.txt').toString('utf8').split("\n");
let matrix = {};
input.forEach(row => {
	if (!row.trim()) return;
	const [ingredients, element] = row.split(' => ');
	const [amount, element_code] = element.split(' ');
	matrix[element_code] = {mod: parseInt(amount, 10), needed: 0, ingredients: []};
	ingredients.split(',').forEach(ingredient => {
		const [i_amount, i_code] = ingredient.trim().split(' ');
		matrix[element_code].ingredients.push({code: i_code, amount: parseInt(i_amount, 10)});
	});
});

for (let element in matrix) {
	element = matrix[element];
	element.ingredients.forEach(ingredient => {
		if (!matrix[ingredient.code]) matrix[ingredient.code] = {mod: 1, needed: 0, ingredients: []};
		matrix[ingredient.code].needed += (ingredient.amount * element.mod);
	});
}

const multiply_element = (code) => {
	const element = matrix[code];
	
	for (element in matrix) {

	}
}

multiply_element('FUEL');

console.log(inspect(matrix, null, 10));











