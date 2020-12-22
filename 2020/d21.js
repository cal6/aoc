const fs = require('fs');
let input = fs.readFileSync('input_21.txt').toString().split("\n");

let rows = [];

for (let row of input) {
	const [_, foreign, translations] = row.match(/([a-z ]+) \(contains ([a-z, ]+)\)/)
	rows.push({foreign: foreign.split(' '), translations: translations.split(',').map(w => w.trim())});
}

let translations = new Map(), matched = new Map(), translated = new Map();
part1: {
	rows.sort((a, b) => a.foreign.length < b.foreign.length ? -1 : 1);
	while (true) {
		for (let row of rows) {
			for (let word of row.translations) {
				if (matched.get(word)) continue;
				if (!translations.get(word)) translations.set(word, row.foreign.map(w => {return {all: word, word: w, seen: true}}));
				translations.get(word).map(m => { m.seen = false; });
				for (let origin of row.foreign) {
					if (translated.get(origin)) continue;
					translations.get(word).map(it => { if (it.word === origin) it.seen = true; });
				}
				translations.set(word, translations.get(word).filter(it => it.seen));
				if (translations.get(word).length === 1) {
					matched.set(word, true);
					translated.set(translations.get(word)[0].word, true);
				}
			}
		}
		if (translations.size === translated.size)
			break;
	}
	let unprocessed_count = 0, unprocessed_words = new Map();
	for (let row of rows) {
		for (let origin of row.foreign) {
			if (!translated.get(origin)) { ++unprocessed_count, unprocessed_words.set(origin, true); }
		}
	}
	console.log('part 1', unprocessed_count);
}

part2: {
	console.log('part 2', Array.from(translations.values()).sort((a,b) => a[0].all < b[0].all ? -1 : 1).map(a => a[0].word).join(','));
}
