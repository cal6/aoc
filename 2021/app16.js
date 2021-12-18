const fs = require('fs');
const Graph = require('node-dijkstra')

const data = fs.readFileSync('data_16.txt').toString('utf8');

const lookup = {
	"0": "0000",
	"1": "0001",
	"2": "0010",
	"3": "0011",
	"4": "0100",
	"5": "0101",
	"6": "0110",
	"7": "0111",
	"8": "1000",
	"9": "1001",
	"A": "1010",
	"B": "1011",
	"C": "1100",
	"D": "1101",
	"E": "1110",
	"F": "1111",
};

function hex2bin(hex) {
    return hex.split('').map(n => lookup[n]).join('');
}

const parsePackage = (bin, lvl = 0) => {
	let body;
	const version = parseInt(bin.splice(0, 3).join(''), 2);
	const type_id = parseInt(bin.splice(0, 3).join(''), 2);
	if (type_id === 4) {
		body = [];
		while (true) {
			const head = bin.splice(0, 1).join('');
			body.push(bin.splice(0, 4).join(''));
			if (head === '0') break;
		}
		return {
			version: version,
			type_id: type_id,
			body: parseInt(body.join(''), 2)
		};
	} else {
		const length_type = parseInt(bin.splice(0, 1).join(''), 2);
		const length = parseInt(bin.splice(0, length_type === 1 ? 11 : 15).join(''), 2);
		let bits = bin.length;
		let packages = {version: version, type_id: type_id, body: []};
		while (true) {
			const package = parsePackage(bin, lvl + 1);
			packages.body.push(package);
			if (length_type === 1 && packages.body.length >= length) break;
			if (length_type === 0 && bits - bin.length >= length) break;
			if (package[0] === -1) break;
		}
		return packages;
	}
}

const sumPackageVersion = (package) => {
	let sum = package.version;
	if (Array.isArray(package.body)) {
		package.body.forEach(pckg => {
			sum += sumPackageVersion(pckg);
		});
	}
	return sum;
}

const parsePackagesData = (package) => {
	let sum = 0;
	let sums = [];
	if (Array.isArray(package.body)) {
		package.body.forEach(pckg => {
			sums.push(parsePackagesData(pckg));
		});
	}
	switch (package.type_id) {
		case 0:
			return sums.reduce((partial_sum, a) => partial_sum + a, 0);
		case 1:
			return sums.reduce((partial_sum, a) => partial_sum * a, 1);
		case 2:
			return Math.min(...sums);
		case 3:
			return Math.max(...sums);
		case 4:
			return package.body;
		case 5:
			return sums[0] > sums[1] ? 1 : 0;
		case 6:
			return sums[0] < sums[1] ? 1 : 0;
		case 7:
			return sums[0] === sums[1] ? 1 : 0;
		default:
			console.log('Unknown type_id ['+package.type_id+']');
			process.exit();
	}
}


const package = parsePackage(hex2bin(data).split(''));

{
	let start = Date.now();
	let sum = sumPackageVersion(package);
	console.log('Part 1', sum, Date.now() - start);
}


{
	let start = Date.now();
	let sum = parsePackagesData(package);
	console.log('Part 2', sum, Date.now() - start);
}
