const fs = require('fs');
const instructions = fs.readFileSync('input_d14.txt').toString().split("\n");

let reindeers = [];

let SEC_LIMIT = 2503;

for (const instruction of instructions) {
	let [_, n, s, d, p] = instruction.toLowerCase().match(/^([a-z]+) .* ([0-9]+) .* ([0-9]+) .* ([0-9]+) seconds\.$/);
	reindeers.push({name: n, speed: parseInt(s, 10), duration: parseInt(d, 10), pause: parseInt(p, 10), distance: 0, score: 0})
}

const distanceInSeconds = (reindeer, sec) => {
	let lapse = reindeer.duration + reindeer.pause;
	let full_cycles = Math.floor(sec / lapse);
	let total_distance = full_cycles * reindeer.speed * reindeer.duration;
	let calculated_seconds = full_cycles * lapse;
	for (let i = calculated_seconds; i < sec; i++) {
		if (i < calculated_seconds + reindeer.duration) {
			total_distance += reindeer.speed;
		}
	}
	return total_distance;
}
let fastest_reindeer, longest_distance = 0;
for (let reindeer of reindeers) {
	reindeer.distance = distanceInSeconds(reindeer, SEC_LIMIT);
	if (reindeer.distance > longest_distance) {
		fastest_reindeer = reindeer;
		longest_distance = reindeer.distance;
	}
}
console.log(fastest_reindeer)


for (let i = 1; i <= SEC_LIMIT; i++) {
	for (let reindeer of reindeers) {
		reindeer.distance = distanceInSeconds(reindeer, i);
	}
	reindeers.sort((a, b) => a.distance > b.distance ? -1 : 1);
	let max_distance = reindeers[0].distance;
	reindeers.map(reindeer => { if (reindeer.distance === max_distance) reindeer.score++; })
}
reindeers.sort((a, b) => a.score < b.score ? -1 : 1);
console.log(reindeers);

