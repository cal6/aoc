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

let coords = {}, last_pos = [0, 0], finish_pos;

const get_input = () => {
	++it;
	return Math.ceil(Math.random() * 4);
};

let it = 0, moves = 0;
let last_dir = -1;
let min_x = 1e200, min_y = 1e200;
let max_x = -1e200, max_y = -1e200;

let program = new Program(input);
program.resume();
while (true) {
	if (program.return < 0 || program.return >= 90) {
		console.log('Error!!!', program); process.exit();
	} if (program.return === 0) {
		break;
	} else if (program.return === 20 && program.output !== undefined) {
		if (program.output === 0) {
			if (last_dir === 1) { coords[last_pos[0]+','+(last_pos[1]-1)] = program.output = 1; min_y = Math.min(min_y, last_pos[1]-1); }
			if (last_dir === 2) { coords[last_pos[0]+','+(last_pos[1]+1)] = program.output = 1; max_y = Math.max(max_y, last_pos[1]+1); }
			if (last_dir === 3) { coords[(last_pos[0]-1)+','+last_pos[1]] = program.output = 1; min_x = Math.min(min_x, last_pos[0]-1); }
			if (last_dir === 4) { coords[(last_pos[0]+1)+','+last_pos[1]] = program.output = 1; max_x = Math.max(max_x, last_pos[0]+1); }
		} else if (program.output === 1 || program.output === 2) {
			if (last_dir === 1) --last_pos[1];
			if (last_dir === 2) ++last_pos[1];
			if (last_dir === 3) --last_pos[0];
			if (last_dir === 4) ++last_pos[0];
			min_x = Math.min(min_x, last_pos[0]);
			min_y = Math.min(min_y, last_pos[1]);
			max_x = Math.max(max_x, last_pos[0]);
			max_y = Math.max(max_y, last_pos[1]);
			++moves;
			coords[last_pos.join(',')] = program.output === 1 ? 0 : 3;
			if (program.output === 2) { finish_pos = [last_pos[0], last_pos[1]]; }
		}
		// console.log('Output: ', program.output);
		if (it === 5000000) { break; }
		program.resume();
	} else if (program.return === 10) {
		//const answer = readline.question('Please provide code: ');
		last_dir = get_input();
		program.addinput(last_dir);
		program.resume();
	} else {
		console.log(program); console.log(program.chain.join(',')), process.exit()
	}
}

const sleep = (millis) => {
    const date = new Date();
    let curDate = null;
    do { curDate = new Date(); }
    while (curDate-date < millis);
}

const icons = [' ', '█', '▒', '═', '°']
const drawboard = () => {
	let image = '';
	for (let y = min_y; y <= max_y; y++) {
		for (let x = min_x; x <= max_x; x++) {
			image += icons[coords[x+','+y] || 0];
		}
		image += "\n";
	}
	console.log(image);
}
const drawvisited = () => {
	let image = '';
	for (let y = min_y; y <= max_y; y++) {
		for (let x = min_x; x <= max_x; x++) {
			image += icons[visited[x+','+y] ? 2 : 0];
		}
		image += "\n";
	}
	console.log(image);
	sleep(50);
}


y_num = [-1, 0, 0, 1];
x_num = [0, -1, 1, 0];
it = 0;
let queue = [{pt: finish_pos, dist: 0}];
let max_distance = 0;
let visited = {};
visited[finish_pos.join(',')] = true;
while (queue.length > 0) {
	++it;
	let pos = queue.shift();
	// if (coords[pos.pt.join(',')] === 3) { console.log('Woohoo', pos); process.exit(); }
	for (let circle = 0; circle < 4; circle++) {
		let point = [pos.pt[0] + x_num[circle], pos.pt[1] + y_num[circle]];
		let point_key = point.join(',');
		if ((coords[point_key] === 0 || coords[point_key] === 3) && !visited[point_key]) {
			queue.push({pt: point, dist: pos.dist+1});
			max_distance = Math.max(max_distance, pos.dist+1);
			visited[point_key] = true;
		}
	}
	drawvisited();
}
console.log('NoooooOo!!!!', it, max_distance); process.exit();


drawboard();









