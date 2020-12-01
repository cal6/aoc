const fs = require('fs');

const routes = fs.readFileSync('input.txt').toString('utf8').split("\n");

const parseRoute = (strpath, routecounts) => {
	let last_coord = [0, 0], visited = {}, step = 1;
	strpath.split(',').forEach((dir) => {
		const heading = dir[0];
		const steps = parseInt(dir.substr(1), 10);
		for (let i = 0; i < steps; i++) {
			switch (heading) {
				case "U":
					last_coord[1]++; break;
				case "D":
					last_coord[1]--; break;
				case "R":
					last_coord[0]++; break;
				case "L":
					last_coord[0]--; break;
				default:
					console.err('Incorrect heading', heading, dir)
			}
			const key = last_coord.join(',');
			if (!routecounts[key]) routecounts[key] = [];
			if (!visited[key]) routecounts[key].push(step);
			visited[key] = true;
			++step;
		}
	});
};

const filterIntersects = (routecounts) => {
	const crossings = [];
	Object.entries(routecounts).forEach(([key, value]) => {
		if (value.length > 1) { 
			let distance = 0; value.map(d => distance += d);
			crossings.push({c: key, d: distance});
		}
	});
	return crossings;
};

const nearestCrossing = (crossings) => {
	let nearest_distance = 1e200, shortest_steps = 1e200;
	crossings.forEach(crossing => {
		const [x, y] = crossing.c.split(',');
		const distance = Math.abs(parseInt(x, 10)) + Math.abs(parseInt(y, 10));
		nearest_distance = Math.min(nearest_distance, distance);
		shortest_steps = Math.min(shortest_steps, crossing.d);
	});
	return {nearest_distance, shortest_steps};
};


const start = Date.now();
const routecounts = {}
parseRoute(routes[0], routecounts);
console.log('++ route 1 calculated', Date.now()-start);
parseRoute(routes[1], routecounts);
console.log('++ route 2 calculated', Date.now()-start);
const crossings = filterIntersects(routecounts);
console.log('++ counts filtered ['+crossings.length+']', Date.now()-start);
const nearest_distance = nearestCrossing(crossings);
console.log('++ nearest distance', nearest_distance, Date.now()-start);



