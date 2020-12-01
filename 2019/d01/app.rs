use std::{
    fs::File,
    io::{prelude::*, BufReader},
    path::Path,
};
use math::round;

fn lines_from_file(filename: impl AsRef<Path>) -> Vec<i64> {
	let file = File::open(filename).expect("no such file");
	let buf = BufReader::new(file);
	buf.lines()
		.map(|l| l.expect("Could not parse line"))
		.flat_map(|x| x.parse())
		.collect()
}

fn calcfuel (weight: &i64) -> (i64) {
	return round.floor(weight / 3) - 2;
}

fn main() {
	let numbers = lines_from_file("./input.txt");
	println!("{:?}", numbers);
	for number in numbers.iter() {
		let fuel = calcfuel(number);
		println!("Fuel needed = {0}", fuel);
	}
}
