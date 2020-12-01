
let input = '3113322113';


const lookAndSay = (str) => {
	let count = 1;
	let out = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== str[i+1]) {
			out += count.toString()+str[i];
			count = 1;
		} else {
			++count;
		}
	}
	return out;
};

for (let i = 0; i < 50; i++) {
	input = lookAndSay(input);
	console.log(i, input.length);
}