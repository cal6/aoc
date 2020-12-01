package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
	"math"
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

func calculatefuel(weight int) (fuel int) {
	return int(math.Floor(float64(weight / 3)) - 2)
}

func main() {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil { panic(err) }
	nums := filterarray(strings.Split(string(data), "\n"))
	totalfuel := 0
	for _, weight := range nums {
		fuel := calculatefuel(weight)
		for fuel > 0 {
			totalfuel += fuel
			fuel = calculatefuel(fuel)
		}
	}
	fmt.Println(totalfuel)

}

