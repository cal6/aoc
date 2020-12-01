const fs = require('fs');
const instructions = fs.readFileSync('input_d09.txt').toString().split("\n").filter(a => !!a);

let nodes = [];
let edges = [];

const addNode = (name) => {
	const exists = nodes.findIndex(node => node.name === name);
	if (exists > -1) return exists;
	nodes.push({name: name, visited: false});
	return nodes.length-1;
};

const addEdge = (node1, node2, distance) => {
	edges.push({n1: node1, n2: node2, distance: distance});
};

for (const instruction of instructions) {
	const [dests, distance] = instruction.split('=').map(a => a.trim());
	const [dest1, dest2] = dests.split('to').map(a => a.trim());
	const node1 = addNode(dest1);
	const node2 = addNode(dest2);
	addEdge(node1, node2, parseInt(distance, 10));
}

const getUnvisitedNodes = (node, visited) => {
	let unvisited = [];
	edges.map(edge => {
		let target = null;
		if (edge.n1 === node) target = edge.n2;
		if (edge.n2 === node) target = edge.n1;
		if (target === null) { return; }
		if (visited.indexOf(target) > -1) { return; }
		unvisited.push(target);
	});
	return unvisited;
};

const calculateDistance = (trip) => {
	let total_distance = 0;
	for (let i = 0; i < trip.length - 1; i++) {
		const edge = edges.find(edge => (edge.n1 === trip[i] && edge.n2 === trip[i+1]) || (edge.n2 === trip[i] && edge.n1 === trip[i+1]))
		total_distance += edge.distance;
	}
	return total_distance;
};

const resolveGraph = (node_idx, trips, trip) => {
	const continuous_nodes = getUnvisitedNodes(node_idx, trip);
	if (continuous_nodes.length === 0) { trips.push({trip: trip, distance: calculateDistance(trip)}); }
	continuous_nodes.map(next_node => {
		let new_trip = trip.slice();
		new_trip.push(next_node);
		resolveGraph(next_node, trips, new_trip)
	});
};


nodes.map((node, node_idx) => {
	let trips = [];
	resolveGraph(node_idx, trips, [node_idx]);
	trips.sort((a, b) => a.distance > b.distance ? -1 : 1);
	console.log(node_idx, trips[0]);
})

