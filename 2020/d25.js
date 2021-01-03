const door_pk = 15335876;
const card_pk = 15086442;
const subject = 7;


let door_cs = 1, card_cs = 1;
let door_loops = 0, card_loops = 0;
while (++door_loops) {
	door_cs = (door_cs * subject) % 20201227;
	if (door_cs === door_pk) break;
}
while (++card_loops) {
	card_cs = (card_cs * subject) % 20201227;
	if (card_cs === card_pk) break;
}
console.log('loops', door_loops, card_loops);
let card_ek = 1, door_ek = 1;
for (let i = 1; i <= card_loops; i++) {
	card_ek = (card_ek * door_pk) % 20201227;
}
for (let i = 1; i <= door_loops; i++) {
	door_ek = (door_ek * card_pk) % 20201227;
}
console.log('encryption keys', card_ek, door_ek)
