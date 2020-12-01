package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

func a2s(a []int, delim string) string {
	return strings.Trim(strings.Replace(fmt.Sprint(a), " ", delim, -1), "[]")
}
func s2a(s string, delim string) []int {
	sa := strings.Split(s, delim)
	ret := []int{0, 0}
	for i, str := range sa {
		ret[i], _ = strconv.Atoi(str)
	}
	return ret
}


func parseRoute(path string, run int, routes map[string][][]int) bool {
	directions := strings.Split(path, ",")
	step   := 1
	coords := []int{0, 0}
	passed := make(map[string]bool)
	for _, direction := range directions {
		heading := direction[0:1]
		steps := int(direction[0])
		for i := 0; i < steps; i++ {
			if heading == "U" { coords[1]++ }
			if heading == "D" { coords[1]-- }
			if heading == "R" { coords[0]++ }
			if heading == "L" { coords[0]-- }
			key := a2s(coords, ",")
			if !passed[key] {
				fmt.Println(passed[key])
				routes[key] = append(routes[key], []int{run, step})
			}
			passed[key] = true
			step++
		}
	}
	return true;
}

func findintersects(routes map[string][][]int) map[string]int {
	results := make(map[string]int)
	for key, counts := range routes {
		if len(counts) > 1 {
			results[key] = counts[0][1] + counts[1][1]
		}
	}
	return results
}

func main() {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil { panic(err) }
	paths := strings.Split(string(data), "\n")
	routes := make(map[string][][]int)
	parseRoute(paths[0], 1, routes)
	fmt.Println("++ done parsing path 1")
	parseRoute(paths[1], 2, routes)
	fmt.Println("++ done parsing path 2")
	intersects := findintersects(routes)
	fmt.Println("++ done finding intersects", len(intersects))
	min_distance := 2147483647
	min_path := 2147483647
	for coord, steps := range intersects {
		if min_path > steps { min_path = steps }
		coords := s2a(coord, ",")
		if coords[0] < 0 { coords[0] *= -1 }
		if coords[1] < 0 { coords[1] *= -1 }
		distance := coords[0] + coords[1]
		fmt.Println(coords, distance)
		if min_distance > distance { min_distance = distance }
	}
	fmt.Println("distance, steps", min_distance, min_path)
}
