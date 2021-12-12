const fs = require('fs');

const data = fs.readFileSync('data_12.txt').toString('utf8').split("\n");


class Graph {
    constructor()
    {
        this.noOfVertices = 0;
        this.AdjList = new Map();
    }
    addVertex(v) { 
    	if (!this.AdjList.get(v)) {
    		this.AdjList.set(v, new Map());
    		++this.noOfVertices; 
    	}
    }
    addEdge(v, w) { 
    	this.AdjList.get(v).set(w, 1); 
    	this.AdjList.get(w).set(v, 1); 
    }
    printAllPaths(s, d, can_visit_twice = false) {
    	let result = [];
		let local_path_list = [];
		local_path_list.push(s);
		this.printAllPathsUtil(s, d, local_path_list, can_visit_twice, result);
		return result;
	}
	printAllPathsUtil(s, d, local_path_list, can_visit_twice, result) {
    	if (s === d) {
    		result.push(local_path_list)
            return true;
        }
        for (let [next_candidate] of this.AdjList.get(s).entries()) {
            if (this.canPass(next_candidate, local_path_list, can_visit_twice)) {
                this.printAllPathsUtil(next_candidate, d, local_path_list.concat(next_candidate), can_visit_twice, result);
            }
        }
        return false;
	}
	canPass(node, local_path_list, can_visit_twice) {
		let is_lower = node === node.toLowerCase();
		
		if (node === 'start') return false;
		if (node === 'end') return true;
		if (is_lower) {
			if (!local_path_list.find(n => n === node)) return true;
			let small_caves = local_path_list.filter(m => m === m.toLowerCase());
			let small_cases_set = new Set(small_caves);
			const visited_twice = (small_caves.length !== small_cases_set.size);
			if (can_visit_twice && !visited_twice) return true;
			return false;
		}
		return true;
	}
}


let graph = new Graph();
data.forEach(row => {
	const [nodeA, nodeB] = row.split('-');
	graph.addVertex(nodeA);
	graph.addVertex(nodeB);
	graph.addEdge(nodeA, nodeB);
});

{
	let start = Date.now();
	const allpaths = graph.printAllPaths('start', 'end');
	console.log('Part 1', allpaths.length, Date.now() - start);
}

{
	let start = Date.now();
	const allpaths = graph.printAllPaths('start', 'end', 2);
	console.log('Part 2', allpaths.length, Date.now() - start);
}
