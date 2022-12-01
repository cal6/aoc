const fs = require('fs');
const data = fs.readFileSync('data_24.txt').toString('utf8').split("\n");



const calc = (int p1) => {
	return w + 12;
}

const calc2 = (w, z) => {
	let x = z;
	x = x % 26;
	x = x + 11;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 8;
	y = y * x;
	z = z + y;
	return z;
}
const calc3 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 11;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 7;
	y = y * x;
	z = z + y;
	return z;
}

const calc4 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 14;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 4;
	y = y * x;
	z = z + y;
	return z;
}
const calc5 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 4;
	y = y * x;
	z = z + y;
	return z;
}
const calc6 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 12;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 1;
	y = y * x;
	z = z + y;
	return z;
}
const calc7 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -1;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 10;
	y = y * x;
	z = z + y;
	return z;
}
const calc8 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 10;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 8;
	y = y * x;
	z = z + y;
	return z;
}
const calc9 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -3;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 12;
	y = y * x;
	z = z + y;
	return z;
}
const calc10 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -4;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 10;
	y = y * x;
	z = z + y;
	return z;
}
const calc11 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -13;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 15;
	y = y * x;
	z = z + y;
	return z;
}
const calc12 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -8;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 4;
	y = y * x;
	z = z + y;
	return z;
}
const calc13 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 13;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 10;
	y = y * x;
	z = z + y;
	return z;
}
const calc14 = (w, z) => {
	let x = 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x === w ? 1 : 0;
	x = x === 0 ? 1 : 0;
	let y = 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 9;
	y = y * x;
	z = z + y;
	return z;
}






class Program {

	constructor(x = 0, y = 0, z = 0, w = 0, input = '') {
		this.input = input;
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	math(what, va, vl) {
		if (['x','y','z','w'].indexOf(vl) > -1) vl = this[vl];
		else vl = parseInt(vl, 10);
		switch (what) {
			case 'inp': 
				this[va] = vl;
				this.input += vl;
				break;
			case 'add': 
				this[va] = this[va] + vl; 
				break;
			case 'mul': 
				this[va] = this[va] * vl; 
				break;
			case 'div': 
				if (vl === 0) throw new Error('Div can not be 0 ('+vl+')'); 
				this[va] = this[va] / vl; 
				break;
			case 'mod': 
				if (this[va] < 0 || vl <= 0) throw new Error('Mod can not be 0 ('+this[va]+','+vl+')'); 
				this[va] = this[va] % vl;
				break;
			case 'eql': 
				this[va] = this[va] === vl ? 1 : 0; 
				break;
			default: 
				throw new Error('Unknown command ['+what+';'+va+';'+vl+']'); break;
		}
		// console.log('result [x='+this['x']+';y='+this['y']+';z='+this['z']+';w='+this['w']+']')
	}
}

let instructions = [];
data.forEach(row => {
	if (!row) return;
	let [what, va, vl] = row.split(' ');
	let v = 0;
	switch (what) {
		case 'inp': console.log(va+' = p'+(++v)+';'); break;
		case 'add': console.log(va+' = '+va+' + '+vl+';'); break;
		case 'mul': console.log(va+' = '+va+' * '+vl+';'); break;
		case 'div': console.log(va+' = '+va+' / '+vl+';'); break;
		case 'mod': console.log(va+' = '+va+' % '+vl+';'); break;
		case 'eql': console.log(va+' = '+va+' == '+vl+' ? 1 : 0;'); break;
	}
	instructions.push({what, va, vl});
});
return;

{
	let timer = Date.now();
	let calcs = 0;
	for (let n1 = 9; n1 >= 1; n1--) {
		let z1 = calc1(n1);
		for (let n2 = 9; n2 >= 1; n2--) {
			let z2 = calc2(n2, z1);
			for (let n3 = 9; n3 >= 1; n3--) {
				let z3 = calc3(n3, z2);
				for (let n4 = 9; n4 >= 1; n4--) {
					let z4 = calc3(n4, z3);
					for (let n5 = 9; n5 >= 1; n5--) {
						let z5 = calc3(n5, z4);
						for (let n6 = 9; n6 >= 1; n6--) {
							let z6 = calc3(n6, z5);
							for (let n7 = 9; n7 >= 1; n7--) {
								let z7 = calc3(n7, z6);
								for (let n8 = 9; n8 >= 1; n8--) {
									let z8 = calc3(n8, z7);
									for (let n9 = 9; n9 >= 1; n9--) {
										let z9 = calc3(n9, z8);
										for (let n10 = 9; n10 >= 1; n10--) {
											let z10 = calc3(n10, z9);
											for (let n11 = 9; n11 >= 1; n11--) {
												let z11 = calc3(n11, z10);
												for (let n12 = 9; n12 >= 1; n12--) {
													let z12 = calc3(n12, z11);
													for (let n13 = 9; n13 >= 1; n13--) {
														let z13 = calc3(n13, z12);
														for (let n14 = 9; n14 >= 1; n14--) {
															let z14 = calc3(n14, z13);
															if (z14 === 0) {
																console.log('!!!', ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+n13+n4);
															}
															++calcs;
															if (calcs >= 100000000) {
																console.log('---', ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+n13+n4)
																calcs = 0;
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return;



	const exec = (p, instr, level = 0) => {
		while (true) {
			if (timer < Date.now()-1000) { console.log(p.input); timer = Date.now(); }
			if (instr.length === 0) {
				if (p.z === 0) {
					console.log(p.input, 'res: x='+p.x+';y='+p.y+';z='+p.z+';w='+p.w);
				}
				break;
			}
			let ci = instr.shift();
			if (ci.what === 'inp') {
				for (let i = 1; i <= 3; i++) {
					let np = new Program(p.x, p.y, p.z, p.w, p.input);
					np.math(ci.what, ci.va, i);
					exec(np, instr.slice(0), level + 1);
				}
				break;
			} else {
				p.math(ci.what, ci.va, ci.vl);
			}
		}
	}
	let start = Date.now();
	let pr = new Program();
	exec(pr, instructions, null);
	console.log('Part 1', null, Date.now() - start);
}