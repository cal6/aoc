package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

func filterarray(stringarray []string) (ret []int) {
	for _, s := range stringarray {
		if s != "" {
			i, err := strconv.Atoi(s);
			if err == nil {
				ret = append(ret, i)
			}
		}
	}
	return
}

func getresult(chain []int) (int) {
	for i := 0; i < len(chain); i += 4 {
		action := chain[i]
		var1   := chain[chain[i+1]]
		var2   := chain[chain[i+2]]
		target := chain[i+3]
		sum    := 0
		if action == 99 { return chain[0] }
		if action == 1 { sum = var1 + var2 }
		if action == 2 { sum = var1 * var2 }
		chain[target] = sum
	}
	return chain[0]
}

func main () {
	for noun := 0; noun < 100; noun++ {
		for verb := 0; verb < 100; verb++ {
			data, err := ioutil.ReadFile("input.txt")
			if err != nil { panic(err) }
			nums := filterarray(strings.Split(string(data), ","))
			nums[1] = noun
			nums[2] = verb
			res := getresult(nums)
			if res == 19690720 {
				fmt.Println(res, noun, verb)
			}
		}
	}
}
