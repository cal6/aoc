const fs = require('fs');
const instructions = fs.readFileSync('input_d08.txt').toString().split("\n");

let total_code = 0;
let total_mem = 0;
let total_encoded = 0;
for (let o_instruction of instructions) {
	total_code += o_instruction.length;
	let s_instruction = o_instruction.substr(1, o_instruction.length - 2);
	s_instruction = s_instruction.replace(/\\"/g, '"');
	s_instruction = s_instruction.replace(/\\\\/g, '\\');
	s_instruction = s_instruction.replace(/\\x[0-9a-f]{2}/g, '1');
	total_mem += s_instruction.length;
	let e_instruction = '"' + o_instruction.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"';
	total_encoded += e_instruction.length;
	console.log(o_instruction, s_instruction, e_instruction);
}
console.log(total_code, total_mem, total_encoded, (total_code-total_mem), (total_encoded-total_code));

