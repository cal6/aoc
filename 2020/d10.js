const fs = require('fs');
let nums = fs.readFileSync('input_10.txt').toString().split("\n").map(n => parseInt(n, 10)).sort((a,b) => a < b ? -1 : 1);
nums.unshift(0)
nums.push(nums[nums.length-1]+3)

part1: {
	let splits = {1: 0, 2: 0, 3: 0};
	for (let i = 1; i < nums.length; i++) {
		++splits[(nums[i] - nums[i-1])];
	}
	console.log('part 1', splits, splits[1] * splits[3]);
}

part2: {

	let visited = [];
	const iterate = (i) => {
		if (i === nums.length - 1) return 1;
		if (typeof visited[i] !== 'undefined') return visited[i];
		let cnt = 0;
		for (let it = i + 1; it <= it + 3 && it < nums.length; it++) {
			if (nums[it] <= nums[i] + 3) cnt += iterate(it);
		}
		visited[i] = cnt;
		return cnt;
	}
	const combinations = iterate(0);
	console.log('part 2', combinations);
}