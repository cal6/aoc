const fs = require('fs');

const image = fs.readFileSync('input.txt').toString('utf8').split("").filter(a => !!a);
const reso = [25,6];

let layers = [], layercounts = [];
for (let i = 0; i < image.length; i += reso[0]*reso[1]) {
	layers.push(image.slice(i, i+reso[0]*reso[1]));
	const curlayer = layers.length-1;
	layercounts[curlayer] = {};
	layers[curlayer].forEach(pixel => {
		if (!layercounts[curlayer][pixel]) layercounts[curlayer][pixel] = 0;
		++layercounts[curlayer][pixel];
	})
}
let min_0 = 1e200, min_0_layer;
layercounts.forEach((layercount, layeridx) => {
	if (layercount['0'] < min_0) { min_0 = layercount['0']; min_0_layer = layeridx; }
})
console.log(layercounts[min_0_layer]['1'] * layercounts[min_0_layer]['2']);

let final_image = [];
for (let i = 0; i < reso[0]*reso[1]; i++) {
	let layer = 0;
	let pixel = layers[layer][i];
	while (pixel === '2' && layers[layer]) {
		pixel = layers[layer][i];
		++layer;
	}
	final_image.push(pixel);
}
for (let i = 0; i < final_image.length; i += reso[0]) {
	console.log(final_image.slice(i, i + reso[0]).join("").replace(/0/g, ' ').replace(/1/g, '▋'))
}
