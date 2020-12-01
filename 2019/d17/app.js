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

const sleep = (millis) => {
    const date = new Date();
    let curDate = null;
    do { curDate = new Date(); }
    while (curDate-date < millis);
}

const icons = [' ', '█', '▒', '═', '°']

let input = fs.readFileSync('input.txt').toString('utf8').split(',').map(a => parseInt(a, 10));
input[0] = 2;
// const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'.split(',').map(a => parseInt(a, 10));

let coords = {}, last_pos = [0, 0], start_pos, direction;
let x_num = [1, 0, -1, 0];
let y_num = [0, 1, 0, -1];
let d_num = ['R','D','L','U'];


let min_x = 1e200, min_y = 1e200;
let max_x = -1e200, max_y = -1e200;

let program = new Program(input);
let visited = {};
let path = [];
let steps = 0;

const find_direction = (pos) => {
	let direction = null;
	for (let circle = 0; circle < 4; circle++) {
		const check_pos = [pos[0]+x_num[circle], pos[1]+y_num[circle]];
		const check_pos_key = check_pos.join(',');
		if ((!visited[check_pos_key] && coords[check_pos_key] === '#') || coords[check_pos_key] === 'O') { 
			direction = circle;
		}
	}
	return direction;
}

const drawboard = () => {
	let image = '';
	for (let y = min_y; y <= max_y; y++) {
		for (let x = min_x; x <= max_x; x++) {
			image += coords[x+','+y] || '?';
		}
		image += "\n";
	}
	console.log(image);
}

const solution = "A,B,A,C,A,A,C,B,C,B\nL,12,L,8,R,12\nL,10,L,8,L,12,R,12\nR,12,L,8,L,10\nn\n";
let solution_pos = 0;
let finished = false;
const get_input = () => {
	let answer = solution[solution_pos].charCodeAt(0);
	solution_pos++;
	if (solution_pos === solution.length) { finished = true; }
	return answer;
}

let output = "";
program.resume();
while (true) {
	if (program.return < 0 || program.return >= 90) {
		console.log('Error!!!', program); process.exit();
	} if (program.return === 0) {
		break;
	} else if (program.return === 20 && program.output !== undefined) {
		if (finished) {
			console.log(program.output);
		} else if (path.length > 0) {
			output += String.fromCharCode(program.output);
		} else {
			if (program.output === 10) { 
				last_pos[1]++; last_pos[0] = 0;
			} else {
				if ([94, 60, 62, 118].indexOf(program.output) > -1) { 
					start_pos = last_pos.slice(0);
					if (program.output === 94) direction = 3;
					else if (program.output === 60) direction = 2;
					else if (program.output === 62) direction = 0;
					else if (program.output === 118) direction = 1;
				}
				coords[last_pos.join(',')] = String.fromCharCode(program.output);
				last_pos[0]++;
			}
			min_x = Math.min(min_x, last_pos[0]);
			min_y = Math.min(min_y, last_pos[1]);
			max_x = Math.max(max_x, last_pos[0]);
			max_y = Math.max(max_y, last_pos[1]);
			// console.log('Output: ', program.output);
		}
		program.resume();
	} else if (program.return === 10) {
		if (path.length === 0) { 
			drawboard();
			calculatePath();
		}
		if (output) { console.log(output); output = ""; }
		const answer = get_input();
		// const answer = readline.question('Please provide code: ');
		program.addinput(answer);
		program.resume();
	} else {
		console.log(program); console.log(program.chain.join(',')), process.exit()
	}
}

return; 

let sum = 0;

for (coord in coords) {
	if (coords[coord] === '#') {
		const truecoord = coord.split(',').map(a => parseInt(a, 10));
		let neighbours = 0;
		for (let circle = 0; circle < 4; circle++) {
			const checkcoord = [truecoord[0] + x_num[circle], truecoord[1] + y_num[circle]];
			if (coords[checkcoord.join(',')] === '#') neighbours++;
		}
		if (neighbours > 2) { 
			coords[coord] = 'O';
			sum += truecoord[0] * truecoord[1];
		}
	}
}

drawboard();

function calculatePath() {
	let pdirection = direction;
	last_pos = start_pos.slice(0);
	while (true) {
		const check_pos = [last_pos[0]+x_num[direction], last_pos[1]+y_num[direction]];
		const check_pos_key = check_pos.join(',');
		if (coords[check_pos_key] === '#' || coords[check_pos_key] === 'O') {
			steps++;
			last_pos = check_pos.slice(0);
			visited[check_pos_key] = true;
		} else {
			if (pdirection === 0 && direction === 1) { path.push('R'); }
			if (pdirection === 0 && direction === 3) { path.push('L'); }
			if (pdirection === 1 && direction === 0) { path.push('L'); }
			if (pdirection === 1 && direction === 2) { path.push('R'); }
			if (pdirection === 2 && direction === 1) { path.push('L'); }
			if (pdirection === 2 && direction === 3) { path.push('R'); }
			if (pdirection === 3 && direction === 0) { path.push('R'); }
			if (pdirection === 3 && direction === 2) { path.push('L'); }
			if (steps > 0) path.push(steps);
			pdirection = direction;
			direction = find_direction(last_pos);
			if (direction === null) { break; }
			steps = 0;
		}
	}
}

/*
let rpath = path.slice(0);
let letters = {'A': '', 'B': '', 'C': ''};
for (let letter in letters) {
	console.log('Process ['+letter+']');
	console.log('remaining => ', rpath.join(','))
	let done = false;
	for (let matcher = 20; matcher > 1; matcher--) {
		if (done) continue;
		const matcher_str = rpath.slice(0, matcher).join(',');
		console.log(matcher_str);
		for (let match = rpath.length - matcher - 1; match > matcher; match--) {
			const match_str = rpath.slice(match, matcher + match).join(',')
			// console.log('>> '+match_str);
			if (matcher_str === match_str) {
				console.log('match: '+matcher_str, match_str, 0, matcher, match, matcher);
				rpath.splice(match, matcher);
				letters[letter] = matcher_str;
				done = true;
			}
		}
		if (done) {
			rpath.splice(0, matcher);
		}
	}
}
return;
*/








