package main

import (
	"fmt"
	"sort"
)

func num2arr (num int) []int {
	ret := []int{0, 0, 0, 0, 0, 0}
	ret[0] = (num / 100000) % 10
	ret[1] = (num / 10000) % 10
	ret[2] = (num / 1000) % 10
	ret[3] = (num / 100) % 10
	ret[4] = (num / 10) % 10
	ret[5] = num % 10
	return ret
}

func checkpass (pass []int) bool {
	sorted := make([]int, 6)
	copy(sorted, pass)
	sort.Ints(sorted)
	isequal := true
	nmap := []int{0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
	for idx, num := range pass {
		if sorted[idx] != num { isequal = false }
		nmap[num]++
	}
	if !isequal { return false }
	has2 := false
	for _, cnt := range nmap {
		if cnt == 2 { has2 = true }
	}
	return has2
}

func main() {
	potentials := 0
	for i := 152085; i <= 670283; i++ {
		arr := num2arr(i)
		if checkpass(arr) { potentials++ }
	}
	fmt.Println("Potentials: ", potentials)
}
