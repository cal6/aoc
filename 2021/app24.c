#include <stdio.h>

int calc2 (int w1, int w2, int w3, int w4, int w5, int w6, int w7, int w8, int w9, int w10, int w11, int w12, int w13, int w14) {
	int x = 0;
	int z = 0;

	z = w1 + 7;

	z *= 26;
	z += w2 + 15;

	z *= 26;
	z += w3 + 2;

	x = z % 26 + -3;
	x = x != w4;
	z /= 26;
	z *= 25 * x + 1;
	z += (w4 + 15) * x;

	z *= 26;
	z += w5 + 14;

	x = z % 26 + -9;
	x = x != w6;
	z /= 26;
	z *= 25 * x + 1;
	z += (w6 + 2) * x;

	z *= 26;
	z += w7 + 15;

	x = z % 26 + -7;
	x = x != w8;
	z /= 26;
	z *= 25 * x + 1;
	z += (w8 + 1) * x;

	x = z % 26 + -11;
	x = x != w9;
	z /= 26;
	z *= 25 * x + 1;
	z += (w9 + 15) * x;

	x = z % 26 + -4;
	x = x != w10;
	z /= 26;
	z *= 25 * x + 1;
	z += (w10 + 15) * x;

	z *= 26;
	z += w11 + 12;

	z *= 26;
	z += w12 + 2;

	x = z % 26 + -8;
	x = x != w13;
	z /= 26;
	z *= 25 * x + 1;
	z += (w13 + 13) * x;
	if (z > 10 && z < 26 && z - 10 == w14) return 1;
	return 0;
}

int calc (int p1, int p2, int p3, int p4, int p5, int p6, int p7, int p8, int p9, int p10, int p11, int p12, int p13, int p14) {
	int x = 0;
	int y = 0;
	int z = 0;
	int w = 0;
	w = p1;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 14;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p2;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 11;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p3;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 11;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p4;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 14;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p5;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p6;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 12;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p7;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -1;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p8;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 10;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p9;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -3;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p10;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -4;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p11;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -13;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p12;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -8;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p13;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 1;
	x = x + 13;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	w = p14;
	x = x * 0;
	x = x + z;
	x = x % 26;
	z = z / 26;
	x = x + -11;
	x = x == w ? 1 : 0;
	x = x == 0 ? 1 : 0;
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
	return z;
}



int main() {
	int calcs = 0;
	for (int n1 = 8; n1 >= 1; n1--) {
		for (int n2 = 9; n2 >= 1; n2--) {
			for (int n3 = 9; n3 >= 1; n3--) {
				for (int n4 = 9; n4 >= 1; n4--) {
					for (int n5 = 9; n5 >= 1; n5--) {
						for (int n6 = 9; n6 >= 1; n6--) {
							for (int n7 = 9; n7 >= 1; n7--) {
								for (int n8 = 9; n8 >= 1; n8--) {
									for (int n9 = 9; n9 >= 1; n9--) {
										for (int n10 = 9; n10 >= 1; n10--) {
											for (int n11 = 9; n11 >= 1; n11--) {
												for (int n12 = 9; n12 >= 1; n12--) {
													for (int n13 = 9; n13 >= 1; n13--) {
														for (int n14 = 9; n14 >= 1; n14--) {
															int winner = calc(n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14);
															if (winner == 0) {
																printf("!!! %d%d%d%d%d%d%d%d%d%d%d%d%d%d\n", n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14);
															}
															++calcs;
															if (calcs >= 1000000000) {
																printf("--- %d%d%d%d%d%d%d%d%d%d%d%d%d%d = %d\n", n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, winner);
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
	return 0;
}