const fs = require('fs');
const instructions = fs.readFileSync('input_d13.txt').toString().split("\n");

let nodes = {};
let names = [];

const addNode = (name, relation, value) => {
	if (names.indexOf(name) < 0) names.push(name);
	if (!nodes[name]) { nodes[name] = {}; }
	nodes[name][relation] = value;
};

for (const instruction of instructions) {
	let [_, l, s, n, r] = instruction.toLowerCase().match(/^([a-z]+) .* ([a-z]+) ([0-9]+) .* ([a-z]+)\.$/);
	n = (s === 'lose') ? n * -1 : parseInt(n);
	addNode(l, r, n);
}

let combinations = [];

const generate = (k, arr) => {
	if (k === 1) { 
		combinations.push(arr.slice(0));
	} else {
		generate(k - 1, arr);
		for (let i = 0; i < k - 1; i++) {
			if ((k % 2) === 0) {
				const t = arr[i];
				arr[i] = arr[k-1];
				arr[k-1] = t;
			} else {
				const t = arr[0];
				arr[0] = arr[k-1];
				arr[k-1] = t;
			}
			generate(k - 1, arr);
		}
	}
}


const findBestScore = (combinations) => {
	let best_score = 0, best_combination;
	console.log('start', combinations.length)
	for (let j = 0; j < combinations.length; j++) {
		let combination = combinations[j];
		let score = 0;
		for (let i = 0; i < combination.length; i++) {
			if (i === 0) { 
				score += nodes[combination[i]][combination[combination.length-1]]; 
				score += nodes[combination[i]][combination[i+1]]; 
			} else if (i === combination.length-1) { 
				score += nodes[combination[i]][combination[i-1]]; 
				score += nodes[combination[i]][combination[0]]; 
			} else { 
				score += nodes[combination[i]][combination[i-1]];
				score += nodes[combination[i]][combination[i+1]];
			}
		}
		if (score > best_score) {
			best_score = score;
			best_combination = combination;
		}
	}	
	return {score: best_score, combination: best_combination};
}

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array
}

generate(names.length, names);
const {score, combination} = findBestScore(combinations);
console.log('best', score, combination);

names.map(name => { 
	addNode('me', name, 0); 
	addNode(name, 'me', 0); 
});
combinations = [];

shuffle(names);

generate(names.length, names);
const {score: score_me, combination: combination_me} = findBestScore(combinations);
console.log('best_me', score_me, combination_me);

