const fs = require('fs');


const data = fs.readFileSync('data07.txt').toString('utf8').split("\n");

const getStruct = () => {
	let curdir = ['/'];
	let res = {'/': {size: 0, fsize: 0, files: [], dirs: {}}};
	data.map(row => {
		if (row.startsWith('dir')) { return; }
		if (row.startsWith('$ ls')) { return; }
		if (row.startsWith('$ cd /')) { return; }
		if (row.startsWith('$ cd ..')) { 
			curdir.pop(); 
			return; 
		}
		if (row.startsWith('$ cd')) { 
			const dir = row.split(' ')[2];
			eval('res["'+curdir.join('"]["dirs"]["')+'"]["dirs"]["'+dir+'"]={size: 0, fsize: 0, files: [], dirs: {}}');
			curdir.push(dir);
			return;
		}
		let [s, f] = row.split(' ');
		s = parseInt(s, 10);
		for (let i = 1; i < curdir.length; i++) {
			eval('res["'+curdir.slice(0, i).join('"]["dirs"]["')+'"]["fsize"] += '+s);
		}
		eval('res["'+curdir.join('"]["dirs"]["')+'"]["size"] += '+s);
		eval('res["'+curdir.join('"]["dirs"]["')+'"]["fsize"] += '+s);
		eval('res["'+curdir.join('"]["dirs"]["')+'"]["files"].push({"'+f+'": '+s+'})');
	});
	return res;
}


const struct = getStruct();

{
	let res = 0;
	const parseSize = (d, st) => {
		if (st.fsize <= 100000) res += st.fsize;
		for (const dir in st.dirs) {
			parseSize(dir, st.dirs[dir]);
		}
	}
	parseSize('/', struct['/']);
	console.log('Result 1', res);
}


{
	let res = 1e200, ddir = '';
	const needed = struct['/'].fsize - 40000000;
	const findSmallest = (d, st) => {
		if (st.fsize >= needed && st.fsize < res) { res = st.fsize; ddir = d; }
		for (const dir in st.dirs) {
			findSmallest(dir, st.dirs[dir]);
		}
	}
	findSmallest('/', struct['/']);
	console.log('Result 2', res);
}