{
	let start = Date.now();
	resetplayers();
	let game = [];
	players.map(pl => game.push(pl.id, 0, pl.place));
	game.push(0, 0, 0);
	// let game = {players: players.map(pl => { return {pl: pl.id, score: 0, place: pl.place}}), midsum: 0, moves: 0, activeplayer: 0};


	let total_games = 1;
	let total_winners = 0;
	let winners = {0: 0, 3: 0};
	const step = (game, dice) => {
		++total_games;
		game[6]++;
		game[7] += dice;
		if (game[6] === 3) {
			let activeplayer = game[8];
			game[activeplayer+2] += game[7];
			if (game[activeplayer+2] > 10) game[activeplayer+2] -= 10;
			game[activeplayer+1] += game[activeplayer+2];
			if (game[activeplayer+1] >= 21) {
				winners[activeplayer]++;
				++total_winners;
				if (total_winners % 1000000 === 0)
					console.log(winners, total_games, total_winners);
				return;
			} else {
				game[6] = 0;
				game[7] = 0;
				game[8] = game[8] === 0 ? 3 : 0;
			}
		}
		for (let i = 1; i <= 3; i++) {
			step(game.slice(0), i);
		}
	}

	for (let i = 1; i <= 3; i++) {
		step(game.slice(0), i);
	}
	console.log('Part 2', total_winners, winners, Date.now() - start);
}


