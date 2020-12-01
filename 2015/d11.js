const bad_letters = [105, 111, 108];
const validateSequence = (seq) => {
	let seq_num = seq.split('').map(a => a.charCodeAt(0));

	if (seq_num.filter(a => bad_letters.includes(a)).length > 0) { return false; }

	let has_seq = false, pairs = 0, seq_count = 1;
	let p_val = -1, p_pair = -1;
	for (let i = 0; i < seq_num.length; i++) {
		if (p_val === seq_num[i]-1) { ++seq_count; }
		else { seq_count = 1; }
		if (p_val === seq_num[i] && p_pair !== seq_num[i]) { ++pairs; p_pair = seq_num[i]; }
		p_val = seq_num[i];
		if (seq_count === 3) has_seq = true;
	}
	return has_seq && pairs >= 2;
};

const getNextSequence = (seq) => {
	let seq_num = seq.split('').map(a => a.charCodeAt(0));
	for (let i = seq_num.length-1; i >= 0; i--) {
		++seq_num[i];
		if (seq_num[i] <= 122) { break; }
		seq_num[i] = 97;
	}
	return seq_num.map(i => String.fromCharCode(i)).join('');
};

let sequence = 'ghijklmn';
while (sequence = getNextSequence(sequence)) {
	if (validateSequence(sequence)) {
		console.log(sequence);
		break;
	}
}