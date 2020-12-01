const fs = require('fs');
const readline = require('readline-sync');

class Program {

	// Internals
	iteration    = 0;
	currentinput = 0;
	inputs       = [];
	chain        = [];
	params       = [];
	vars         = [];
	pointer      = 0;

	// Exposed results
	output  = null;
	error   = null;

	// Rerturn value / interrupt
	/*
		-1  - executing, abnormal exit
		 0  - normal exit
		 10 - missing input
		 20 - output provided

		 99 - unknown command
	*/
	return  = -1;

	constructor(chain) {
		this.chain = chain;
	}

	addinput(input) {
		this.inputs.push(input);
	}

	resume() {
		this.return = -1;
		this.execute_step();
	}

	parseparams(num) {
		this.params = [];
		this.vars = [];
		for (let i = 0; i < num; i++) {
			this.params[i] = Math.floor(this.chain[this.pointer] / (10 * Math.pow(10, i+1))) % 10;
			this.vars[i] = this.params[i] === 1 ? this.pointer + 1 + i : this.params[i] === 0 ? this.chain[this.pointer + 1 + i] : 'x';
		}
	}

	execute_step() {
		++this.iteration
		const action = Math.floor(this.chain[this.pointer] / 10) % 10 * 10 + this.chain[this.pointer] % 10;
		switch (action) {
			case 99:
				this.return = 0;
				break;
			case 1:
				this.parseparams(3);
				this.chain[this.vars[2]] = this.chain[this.vars[0]] + this.chain[this.vars[1]];
				this.pointer += 4;
				break;
			case 2:
				this.parseparams(3);
				this.chain[this.vars[2]] = this.chain[this.vars[0]] * this.chain[this.vars[1]];
				this.pointer += 4;
				break;
			case 3:
				this.parseparams(1);
				if (this.inputs[this.currentinput] === undefined) {
					this.return = 10; break;
				}
				this.chain[this.vars[0]] = this.inputs[this.currentinput]; ++this.currentinput;
				this.pointer += 2;
				break;
			case 4:
				this.parseparams(1);
				this.output = this.chain[this.vars[0]];
				this.return = 20;
				this.pointer += 2;
				break;
			case 5:
				this.parseparams(2);
				if (this.chain[this.vars[0]] !== 0) { 
					this.pointer = this.chain[this.vars[1]];
				} else {
					this.pointer += 3;
				}
				break;
			case 6:
				this.parseparams(2);
				if (this.chain[this.vars[0]] === 0) { 
					this.pointer = this.chain[this.vars[1]];
				} else {
					this.pointer += 3;
				}
				break;
			case 7:
				this.parseparams(3);
				if (this.chain[this.vars[0]] < this.chain[this.vars[1]]) { 
					this.chain[this.vars[2]] = 1;
				} else {
					this.chain[this.vars[2]] = 0;
				}
				this.pointer += 4;
				break;
			case 8:
				this.parseparams(3);
				if (this.chain[this.vars[0]] === this.chain[this.vars[1]]) { 
					this.chain[this.vars[2]] = 1;
				} else {
					this.chain[this.vars[2]] = 0;
				}
				this.pointer += 4;
				break;
			default: 
				this.return = 99;
				this.error = 'Unknown code ['+action+']'
				break;
		}
		if (this.return >= 0) { 
			return; 
		}
		this.execute_step();

	}

}


const input = fs.readFileSync('../d07/input.txt').toString('utf8').split(',').map(a => parseInt(a, 10));
//const input = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'.split(',').map(a => parseInt(a, 10));


const n2a = (num) => {
	let arr = num.toString().split("").map(a => parseInt(a, 10));
	for (let i = arr.length; i < 5; i++) {
		arr.unshift(0);
	}
	return arr;
};

const iu = (arr) => {
	let unique = arr.filter((v, i, a) => a.indexOf(v) === i);
	unique = unique.filter(a => a > 4)
	if (unique.length !== arr.length) return false;
	return true;
};

let max_result = -1, max_seq;
for (let seq = 56789; seq < 98765; seq++) {
	const phase_setting = n2a(seq);
	if (!iu(phase_setting)) continue;
	let programs = [];
	phase_setting.forEach((phase, idx) => {
		const program = new Program(input);
		program.addinput(phase);
		if (idx === 0) { program.addinput(0); }
		programs.push(program);
	});
	let last_output;
	it = 0;
	while (true && it < 100) {
		let finished = 0;
		programs.forEach((program, idx) => {
			if (program.return === 0) { 
				++finished; 
			} else if (last_output !== null && last_output !== undefined) {
				program.addinput(last_output);
			}
			program.resume();
			if (program.return !== 10 && program.return !== 20 && program.return !== 0 && program.return !== 0) { 
				console.log(program); process.exit();
			}
			last_output = program.output;
		});
		if (finished === programs.length) { break; }
		++it;
	}
	if (last_output > max_result) {
		max_result = last_output;
		console.log('max', max_result, phase_setting);
	}
}








