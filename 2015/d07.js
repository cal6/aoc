const fs = require('fs');
const instructions = fs.readFileSync('input_d07.txt').toString().split("\n");

const to_unsigned = (x) => {
	return (x & 0xFFFF) >>> 0
}

let nodes = {};

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const addNode = (name, op, left_src, right_src) => {
	nodes[name] = {op: op, left_src: left_src, right_src: right_src};
};

const getNodeValue = (name) => {
	if (isNumeric(name)) return to_unsigned(parseInt(name, 10));
	const node = nodes[name];
	if (node.value) { return node.value; }
	if (!node) {
		console.log('Unknown node ['+name+']');
		process.exit();
	}
	let ret;
	if (node.op === 'STORE')
		ret = getNodeValue(node.left_src);
	else if (node.op === 'NOT')
		ret = to_unsigned(~getNodeValue(node.left_src));
	else if (node.op === 'AND')
		ret = to_unsigned(getNodeValue(node.left_src) & getNodeValue(node.right_src));
	else if (node.op === 'OR')
		ret = to_unsigned(getNodeValue(node.left_src) | getNodeValue(node.right_src));
	else if (node.op === 'RSHIFT')
		ret = to_unsigned(getNodeValue(node.left_src) >>> getNodeValue(node.right_src));
	else if (node.op === 'LSHIFT')
		ret = to_unsigned(getNodeValue(node.left_src) << getNodeValue(node.right_src));
	else {
		console.log('Unknown OP while valuing ['+node.op+']');
		process.exit();
	}
	node.value = ret;
	return ret;
};

for (const instruction of instructions) {
	const parts = instruction.split(' ');
	if (parts[1] === '->') addNode(parts[2], 'STORE', parts[0])
	else if (parts[1] === 'AND') addNode(parts[4], 'AND', parts[0], parts[2]);
	else if (parts[1] === 'OR') addNode(parts[4], 'OR', parts[0], parts[2]);
	else if (parts[1] === 'LSHIFT') addNode(parts[4], 'LSHIFT', parts[0], parts[2]);
	else if (parts[1] === 'RSHIFT') addNode(parts[4], 'RSHIFT', parts[0], parts[2]);
	else if (parts[0] === 'NOT') addNode(parts[3], 'NOT', parts[1]);
	else console.log('Unknown OP while parsing ['+parts+']');
}

let a = getNodeValue('a');
console.log(a);
for (let name in nodes) {
	delete nodes[name].value;
}
addNode('b', 'STORE', a);
console.log(getNodeValue('a'));
