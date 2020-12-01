const fs = require('fs');
const readline = require('readline-sync');

class Program {

	// Internals
	relativebase = 0;
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
		while (this.execute_step()) {

		}
	}

	extendmem(num) {
		for (let i = this.chain.length-1; i <= num; i++) {
			if (!this.chain[i]) {
				this.chain[i] = 0;
			}
		}
	}

	parseparams(num) {
		this.params = [];
		this.vars = [];
		for (let i = 0; i < num; i++) {
			this.params[i] = Math.floor(this.chain[this.pointer] / (10 * Math.pow(10, i+1))) % 10;
			let pointer = 
				this.params[i] === 0 ? (this.chain[this.pointer + 1 + i]) : 
				this.params[i] === 1 ? (this.pointer + 1 + i) :
				this.params[i] === 2 ? (this.relativebase + this.chain[this.pointer + 1 + i]) : 
				'x';
			this.vars[i] = this.chain[pointer] || 0;
			this.extendmem(pointer);
		}
	}

	getwriteaddress(pos) {
		const retpos = 
			this.params[pos] === 2 ? (this.relativebase + this.chain[this.pointer + pos + 1]) : 
			this.params[pos] === 0 ? (this.chain[this.pointer + pos + 1]) : 
			(console.error('incorrect write param at ['+pos+'] / ['+this.params[pos]+'] pointer ['+this.pointer+']'), console.log(this.chain), process.exit());

		this.extendmem(retpos);
		return retpos;

	}

	execute_step() {
		++this.iteration
		const code = this.chain[this.pointer];
		let jump = 0;
		const action = ((Math.floor(code / 10) % 10) * 10) + (this.chain[this.pointer] % 10);
		let inpparams;
		let outparams;
		// console.log('"'+this.chain[this.pointer]+'"', this.pointer, action)
		switch (action) {
			case 99:
				this.return = 0;
				break;
			case 1:
				this.parseparams(3);
				this.chain[this.getwriteaddress(2)] = this.vars[0] + this.vars[1];
				jump = 4;
				break;
			case 2:
				this.parseparams(3);
				this.chain[this.getwriteaddress(2)] = this.vars[0] * this.vars[1];
				jump = 4;
				break;
			case 3:
				this.parseparams(1);
				if (this.inputs[this.currentinput] === undefined) {
					this.return = 10; break;
				}
				this.chain[this.getwriteaddress(0)] = this.inputs[this.currentinput]; ++this.currentinput;
				jump = 2;
				break;
			case 4:
				this.parseparams(1);
				this.output = this.vars[0];
				this.return = 20;
				jump = 2;
				break;
			case 5:
				this.parseparams(2);
				if (this.vars[0] !== 0) { 
					this.pointer = this.vars[1];
				} else {
					jump = 3;
				}
				break;
			case 6:
				this.parseparams(2);
				if (this.vars[0] === 0) { 
					this.pointer = this.vars[1];
				} else {
					jump = 3;
				}
				break;
			case 7:
				this.parseparams(3);
				if (this.vars[0] < this.vars[1]) { 
					this.chain[this.getwriteaddress(2)] = 1;
				} else {
					this.chain[this.getwriteaddress(2)] = 0;
				}
				jump = 4;
				break;
			case 8:
				this.parseparams(3);
				if (this.vars[0] === this.vars[1]) { 
					this.chain[this.getwriteaddress(2)] = 1;
				} else {
					this.chain[this.getwriteaddress(2)] = 0;
				}
				jump = 4;
				break;
			case 9:
				this.parseparams(1);
				this.relativebase = this.relativebase + this.vars[0];
				this.extendmem(this.relativebase);
				jump = 2;
				break;
			default: 
				this.return = 99;
				this.error = 'Unknown code ['+action+']'
				break;
		}
		// console.log('Parameters:', this.pointer, action, jump, this.vars, this.params, this.relativebase);
    	// console.log(`After operation ${action}, ${code}`);
    	// console.log('relativeBase', this.relativebase);
		// console.log(this.params, this.vars, this.relativebase)
		this.pointer += jump;

		if (this.return >= 0) { 
			return false; 
		}
		return true;
	}

}


const input = fs.readFileSync('input.txt').toString('utf8').split(',').map(a => parseInt(a, 10));
// const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'.split(',').map(a => parseInt(a, 10));

let program = new Program(input);
program.addinput(2);
while (true) {
	program.resume();
	if (program.return < 0 || program.return >= 90) {
		console.log('Error!!!', program); process.exit();
	} if (program.return === 0) {
		console.log('final output', program.output);
		break;
	} else if (program.return === 20 && program.output !== undefined) {
		console.log('output', program.output, program.pointer);
	} else if (program.return === 10) {
		const answer = readline.question('Please provide code: ');
		program.addinput(parseInt(answer, 10));
		program.resume();
	} else {
		console.log(program); console.log(program.chain.join(',')), process.exit()
	}
}
console.log(program);
// console.log(program.chain.length)
// console.log(program.chain.join(','))









