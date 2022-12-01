const fs = require('fs');


const data = fs.readFileSync('data_21.txt').toString('utf8').split("\n");

let players = [];
const resetplayers = () => {
	players = [];
	data.forEach((row) => {
		const match = row.match(/([0-9]+).*([0-9]+)/);
		if (match) players.push({id: parseInt(match[1], 10), place: parseInt(match[2], 10), score: 0, moves: 0, universes: 1n});
	});
}

{
	let start = Date.now();
	resetplayers();
	let moves = 0;
	let dice = 0;

	const roll = (dice) => {
		let ret = 0;
		for (let i = 0; i < 3; i++) {
			ret += ++dice;
			if (dice === 100) dice = 0;
		}
		return [dice, ret];
	}

	while (true) {
		let winner;
		players.forEach(pl => {
			if (winner) return;
			let subsum;
			[dice, subsum] = roll(dice);
			moves += 3;
			let place = pl.place + subsum;
			while (place > 10) place -= 10;
			pl.place = place;
			pl.score += pl.place;
			if (pl.score >= 21) winner = pl;
		});
		if (winner) break;
	}
	players.sort((a, b) => a.score < b.score ? -1 : 1);
	console.log('Part 1', moves * players[0].score, Date.now() - start);
}



{
	let start = Date.now();
	resetplayers();
	let game = [];
	players.map(pl => game.push(pl.id, 0, pl.place)); // populate players
	game.push(0, 0, 0, 1); // steps, midscore, active player [0,3], count_universes

	const genpermutations = () => {
		let ret = {};
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 3; j++) {
				for (let k = 1; k <= 3; k++) {
					let p = i + j + k;
					if (!ret[p]) ret[p] = 0;
					ret[p]++;
				}
			}
		}
		return ret;
	}

	const permutations = genpermutations();


	let total_games = 1;
	let total_winners = 0;
	let counted = 0;
	let tt = Date.now();
	let winners = [0, 0, 0, 0];
	let patterns = {};
	
	const step = (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, dice, cuniverses) => {
		total_games++;
		p6 += 3;
		p7 = p7 + dice;
		p9 *= cuniverses;

		const activeplayer = p8;
		if (activeplayer === 0) { p2 = p2 + p7; if (p2 > 10) p2 = p2 - 10; p1 = p1 + p2; }
		else if (activeplayer === 3) { p5 = p5 + p7; if (p5 > 10) p5 = p5 - 10; p4 = p4 + p5; }
		if (p1 >= 21 || p4 >= 21) {
			winners[activeplayer] += p9;
			total_winners += p9;
			counted++;
			if (counted > 10000000) {
				const ttn = Date.now();
				console.log(winners, total_games, total_winners, (total_games - total_winners), ttn-tt);
				counted = 0;
				tt = ttn;
			}
			return;
		} else {
			p6 = 0;
			p7 = 0;
			p8 = p8 === 0 ? 3 : 0;
		}
		for (let [p, c] of Object.entries(permutations)) {
			step(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, parseInt(p, 10), c);
		}
	}

	for (let [p, c] of Object.entries(permutations)) {
		step(...game, parseInt(p, 10), c);
	}
	console.log('Part 2', total_winners, winners, Date.now() - start);
}


