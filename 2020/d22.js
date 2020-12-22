const fs = require('fs');
let input = fs.readFileSync('input_22.txt').toString().split("\n");

let players = [];

const dealCards = () => {
	let curplayer;
	for (let row of input) {
		if (!row) continue;
		if (row.startsWith('Player')) { curplayer = parseInt(row.replace('Player ', '').replace(':', ''), 10); players[curplayer] = []; continue; }
		const card = parseInt(row, 10);
		players[curplayer].push(card);
	}
}

part1: {
	dealCards();
	while (true) {
		const card1 = players[1].shift();
		const card2 = players[2].shift();
		if (card1 > card2) { players[1].push(card1); players[1].push(card2); }
		else if (card2 > card1) { players[2].push(card2); players[2].push(card1); }
		else if (card1 === card2) { players[1].push(card1); players[2].push(card2); }
		if (players[1].length === 0 || players[2].length === 0) {
			break;
		}
	}
	let winning_hand = players[1].length === 0 ? players[2] : players[1];
	winning_hand.reverse();
	let sum = 0;
	winning_hand.map((n, i) => sum += (i+1)*n);
	console.log('part 1', sum);
}

part2: {
	let winnerdeck;
	dealCards();
	const playGame = (deck1, deck2, it) => {
		let hands = {1: new Set(), 2: new Set()};
		const saveHands = () => {
			if (hands[1].has(deck1.join(','))) return false;
			hands[1].add(deck1.join(','));
			if (hands[2].has(deck2.join(','))) return false;
			hands[2].add(deck2.join(','));
			return true;
		}
		while (true) {
			if (!saveHands()) {
				return 1;
			}
			let winner;
			const card1 = deck1.shift();
			const card2 = deck2.shift();
			if (card1 <= deck1.length && card2 <= deck2.length) {
				winner = playGame(deck1.slice(0, card1), deck2.slice(0, card2), ++it);
			}
			if (winner === 1) { deck1.push(card1); deck1.push(card2); }
			else if (winner === 2) { deck2.push(card2); deck2.push(card1); }
			else if (card1 > card2) { deck1.push(card1); deck1.push(card2); }
			else if (card2 > card1) { deck2.push(card2); deck2.push(card1); }
			else if (card1 === card2) { deck1.push(card1); deck2.push(card2); }
			if (deck1.length === 0 || deck2.length === 0) {
				let winner = deck1.length === 0 ? 2 : 1;
				winnerdeck = deck1.length === 0 ? deck2 : deck1;
				return winner;
			}
		}
	}
	const gwinner = playGame(players[1], players[2], 1);
	winnerdeck.reverse();
	let sum = 0;
	winnerdeck.map((n, i) => sum += (i+1)*n);

	console.log('part 2', sum);
}
