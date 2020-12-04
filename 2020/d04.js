const fs = require('fs');
const input = fs.readFileSync('input_04.txt').toString().split("\n\n");

let entries = [];
for (let row of input) {
	let entry = {};
	row = row.split("\n").join(' ').split(' ');
	for (let pc of row) { 
		const [fld, val] = pc.split(':');
		entry[fld] = val;
	}
	entries.push(entry);
}

part1: {
	let valids = 0;
	for (const entry of entries) {
		if (entry.byr && entry.iyr && entry.eyr && entry.hgt && entry.hcl && entry.ecl && entry.pid) {
			++valids
		}
	}
	console.log('Part 1, Valid passports', valids);
}

part2: {
	let validate = {
		byr: (s) => { s = parseInt(s, 10); return s >= 1920 && s <= 2002; },
		iyr: (s) => { s = parseInt(s, 10); return s >= 2010 && s <= 2020; },
		eyr: (s) => { s = parseInt(s, 10); return s >= 2020 && s <= 2030; },
		hgt: (s) => { 
			const i = parseInt(s, 10);
			if (s.substring(s.length-2) === 'cm') {
				return i >= 150 && i <= 193;
			}
			if (s.substring(s.length-2) === 'in') {
				return i >= 59 && i <= 76;
			}
			return false;
		},
		hcl: (s) => { return (s||'').match(/^#[0-9a-z]{6}$/); },
		ecl: (s) => { return ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(s) > -1; },
		pid: (s) => { return (s||'').match(/^[0-9]{9}$/); },
		cid: (s) => { return true; },
	}
	let valids = 0;
	for (const entry of entries) {
		if (entry.byr && entry.iyr && entry.eyr && entry.hgt && entry.hcl && entry.ecl && entry.pid) {
			passed = true;
			for (const idx in entry) {
				if (!validate[idx](entry[idx])) passed = false;
			}
			if (passed) ++valids
		}
	}
	console.log('Part 2, Valid passports', valids);

}