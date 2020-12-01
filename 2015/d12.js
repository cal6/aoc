const input = require('./input_d12.json');

let sum = 0;
const parseNode = (node) => {
	if (typeof node === 'object') { 
		if (!Array.isArray(node)) {
			for (let i in node) {
				if (node[i] === 'red') {
					console.log('haz red', node);
					return;
				}
			}
		}
		for (let i in node) {
			parseNode(node[i]);
		}
		return;
	}
	if (typeof node === 'string') { return; }
	sum += node;
};

parseNode(input);
console.log(sum);

