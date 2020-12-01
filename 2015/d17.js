const fs = require('fs');
const containers = fs.readFileSync('input_d17.txt').toString().split("\n")
					.map((n, i) => parseInt(n, 10))
					.sort((a, b) => a < b ? -1 : 1)
					.map((n, i) => n+'-'+i);
console.log(containers);
const TOTAL_EGGNOD = 150;

let matchcount = 0, matched = [];

let permutation_count = 0;

const alreadyProcessed = (arr, dst) => {
	arr.sort();
	const arr_join = arr.join(',');
	dst.sort();
	let has_match = false;
	dst.map(it => {
		if (arr_join === it.join(',')) { has_match = true; }
	});
	return has_match;
};

const findMatch = (comb) => {
	let sum = 0, members = [];
	for (let n of comb) { 
		sum += parseInt(n, 10); members.push(n);
		if (sum === TOTAL_EGGNOD) {
			if (!alreadyProcessed(members, matched)) {
				++matchcount;
				console.log('++ winner', sum, members);
				matched.push(members);
			}
			break;
		}
	}
}

let results = [], used_combinations = [];
const distSumRec = (arr, n, sum, summed, currindex) => { 
	if (currindex > n) {
		return; 
	}

	if (sum === TOTAL_EGGNOD) {
		if (!alreadyProcessed(summed, used_combinations)) {
			used_combinations.push(summed);
			results.push({sum: sum, summed: summed.length}); 
		}
	}
	if (currindex === n) { 
		return; 
	} 
	distSumRec(arr, n, sum + parseInt(arr[currindex], 10), summed.concat(arr[currindex]), currindex+1); 
	distSumRec(arr, n, sum, summed, currindex+1);
} 
distSumRec(containers, containers.length, 0, [], 0)
results = results.filter(n => n.sum === TOTAL_EGGNOD).sort((a, b) => a.summed < b.summed ? -1 : 1);
let min_summed = results[0].summed;
console.log(min_summed);
console.log(results.filter(n => n.summed === min_summed).length);

