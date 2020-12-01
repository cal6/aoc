const start = Date.now();
const l = (msg) => {
	console.log('['+msg+'] time [' + (Date.now() - start) + ']')
}

const fs = require('fs');

let nodes = {};

const parseorbit = (orbit) => {
	orbit = orbit.split(')');
	if (!nodes[orbit[0]]) { 
		nodes[orbit[0]] = {nodes: [], parent: null}
	}
	nodes[orbit[0]].nodes.push(orbit[1]);
	if (!nodes[orbit[1]]) {
		nodes[orbit[1]] = {nodes: [], parent: orbit[0]}
	}
	if (!nodes[orbit[1]].parent) { nodes[orbit[1]].parent = orbit[0]; }
};

const countchildren = (node, depth = 0) => {
	const nodeo = nodes[node];
	if (nodeo.nodes.length === 0) { return depth; }
	let res = 0;
	nodeo.nodes.forEach((subnode) => {
		res += countchildren(subnode, depth + 1);
	})
	return res + depth;
}

const getpath = (origin) => {
	let path = [];
	let node = nodes[origin];
	while (node.parent) {
		path.push(node.parent);
		node = nodes[node.parent];
	}
	path.reverse();
	return path;
}

const findlastcommonindex = (path1, path2) => {
	let i = 1;
	while (path1[i] === path2[i] && path1[i] && path2[i]) {
		i++;
	}
	return i-1;
};


l('Start');

fs.readFileSync('input.txt').toString('utf8').split("\n").filter(a => !!a).map(parseorbit);
l('File read and parsed');

const total = countchildren('COM');
console.log('total', total);
l('Counted');

const path1 = getpath('YOU')
const path2 = getpath('SAN')
const intersect = findlastcommonindex(path1, path2);
const frag1 = path1.length - intersect - 1;
const frag2 = path2.length - intersect - 1;
console.log('intersect and frags', intersect, frag1, frag2);
const orbits = frag1 + frag2;
console.log('orbits', orbits);
l('Intersected');

