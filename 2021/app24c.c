#include <stdio.h>

int main()
{
	int count = 0;
	#pragma omp parallel
	#pragma omp for
	for (int w1 = 1; w1 < 10; w1++) {
	for (int w2 = 1; w2 < 10; w2++) {
	for (int w3 = 1; w3 < 10; w3++) {
		fprintf(stderr, "> %d%d%d\n", w1, w2, w3);

	for (int w4 = 1; w4 < 10; w4++) {
	for (int w5 = 1; w5 < 10; w5++) {
	for (int w6 = 1; w6 < 10; w6++) {
	for (int w7 = 1; w7 < 10; w7++) {
	for (int w8 = 1; w8 < 10; w8++) {
	for (int w9 = 1; w9 < 10; w9++) {
	for (int w10 = 1; w10 < 10; w10++) {
	for (int w11 = 1; w11 < 10; w11++) {
	for (int w12 = 1; w12 < 10; w12++) {
	for (int w13 = 1; w13 < 10; w13++) {
	for (int w14 = 1; w14 < 10; w14++) {


	int x = 1;
	int y = 0;
	int z = 0;
	int w = 0;
	// Part 1
	z = w1 + 12;
	// Part 2
	w = w2;
	x = z % 26;
	x = x + 11;
	x = x == w ? 0 : 1;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 8;
	y = y * x;
	z = z + y;
	w = w3;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 11;
	x = x == w ? 0 : 1;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 7;
	y = y * x;
	z = z + y;
	w = w4;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 14;
	x = x == w ? 0 : 1;
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
	w = w5;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x == w ? 0 : 1;
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
	w = w6;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 12;
	x = x == w ? 0 : 1;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 1;
	y = y * x;
	z = z + y;
	w = w7;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -1;
	x = x == w ? 0 : 1;
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
	w = w8;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 10;
	x = x == w ? 0 : 1;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 8;
	y = y * x;
	z = z + y;
	w = w9;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -3;
	x = x == w ? 0 : 1;
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
	w = w10;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -4;
	x = x == w ? 0 : 1;
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
	w = w11;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -13;
	x = x == w ? 0 : 1;
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
	w = w12;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -8;
	x = x == w ? 0 : 1;
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
	w = w13;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 13;
	x = x == w ? 0 : 1;
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
	w = w14;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x == w ? 0 : 1;
	y = y * 0;
	y = y + 25;
	y = y * x;
	y = y + 1;
	z = z * y;
	y = y * 0;
	y = y + w;
	y = y + 9;
	y = y * x;
	z = z + y;

	if (z == 0) {
		if (!count++) {
			fprintf(stderr, "found first!\n");
		}
		if (count % 100 == 0) {
			fprintf(stderr, "%d found so far\n", count);
		}
		printf("%d%d%d%d%d%d%d%d%d%d%d%d%d%d\n", w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14);
	}
	}}}}}}}}}}}}}}
	fprintf(stderr, "%d found in total\n", count);
}