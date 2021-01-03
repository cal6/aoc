const doCrab = (part) => {
	let cups = '463528179'.split('').map(n => parseInt(n, 10));
	//let cups = '389125467'.split('').map(n => parseInt(n, 10));
	if (part === 2) {
		for (let i = 10; i <= 1000000; i++) { 
			cups.push(i);
		}
	}
	let min_cup = 1, max_cup = (part === 2 ? 1000000 : 9);
	const cups_total = cups.length;
	const moves = (part === 1 ? 100 : 10000000);
	console.log('start')
	for (let i = 0; i < moves; i++) {
		if (i > 0 && i % 1000 === 0) console.log('processing', i);
		const pickedup = cups.splice(1, 3);
		const cup = cups.shift();
		cups.push(cup);
		let destination = cup;
		while (true) { 
			--destination;
			if (destination < 1) destination = max_cup; 
			if (pickedup.indexOf(destination) < 0) break;
		}
		const destination_index = cups.findIndex(a => a === destination);
		cups.splice(destination_index+1, 0, ...pickedup);
	}
	while (true) {
		if (cups[0] === 1) break;
		cups.push(cups.shift());
	}
	if (part === 2) {
		console.log('part 2', cups[1], cups[2], cups[1] * cups[2]);
	} else {
		cups.shift();
		console.log('part 1', cups.join(''));
		// part 1 [52937846]
	}
}
doCrab(1);
doCrab(2);


