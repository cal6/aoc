package main

import (
	"fmt"
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

func findIndex(arr []int, subject int) int {
    for i := 0; i < len(arr); i++ {
        if arr[i] == subject {
            return i
        }
    }
    return -1
}

func main () {
	cups := filterarray(strings.Split("463528179", ""))
	for i := 10; i <= 1000000; i++ {
		cups = append(cups, i)
	}
	max_cup := 1000000
	for i := 0; i < 10000000; i++ {
		if i > 0 && i % 1000 == 0 { 
			fmt.Println(i)
		}
		cup := cups[0]
		pickedup := cups[1:4]
		destination := cup
		cups = cups[4:]
		for true {
			destination--
			if destination < 1 { destination = max_cup }
			if findIndex(pickedup, destination) == -1 { break }
		}
		destination_index := findIndex(cups, destination)
		cups = append(cups, 0, 0, 0)
		copy(cups[destination_index+4:], cups[destination_index+1:])
		cups[destination_index+1] = pickedup[0]
		cups[destination_index+2] = pickedup[1]
		cups[destination_index+3] = pickedup[2]
		cups = append(cups, cup)
	}
	for true {
		if cups[0] == 1 { break }
		cups = append(cups[1:], cups[0])
	}
	//fmt.Println(cups)
	fmt.Println(cups[1], cups[2])

}
