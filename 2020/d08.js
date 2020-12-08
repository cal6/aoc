const fs = require('fs');

const parseLine = (str) => {
	let [cmd, val] = str.split(' ');
	return {cmd: cmd, val: parseInt(val, 10)};
}

const cmdset = fs.readFileSync('input_08.txt').toString().split("\n").map(parseLine);

class Program {

	accumulator = 0;
	visitedlines = [];
	line = 0;

	exec(cmd, val) {
		if (this.visitedlines.indexOf(this.line) > -1) {
			return false;
		}
		this.visitedlines.push(this.line);
		this[cmd](val);
		return true;
	}

	acc(val) {
		this.accumulator += val;
		++this.line;
	}
	nop(val) {
		++this.line;
	}
	jmp(val) {
		this.line += val;
	}
}

let fixed_row = -1;
const fixProgram = () => {
	if (fixed_row > -1) {
		cmdset[fixed_row].cmd = cmdset[fixed_row].cmd === 'jmp' ? 'nop' : 'jmp';
	}
	while (true) {
		++fixed_row;
		if (['jmp', 'nop'].indexOf(cmdset[fixed_row].cmd) > -1) {
			cmdset[fixed_row].cmd = cmdset[fixed_row].cmd === 'jmp' ? 'nop' : 'jmp';
			break;
		}
	}
};

let part1_done = false;
while (true) {
	let prog = new Program();
	while (true) {
		const op = cmdset[prog.line];
		const res = prog.exec(op.cmd, op.val);
		if (prog.line === cmdset.length) {
			console.log('finished', prog.accumulator);
			process.exit();
		}
		if (!res) {
			if (!part1_done) {
				console.log('part 1', prog.accumulator);
				part1_done = true;
			}
			fixProgram();
			break;
		}
	}
}
