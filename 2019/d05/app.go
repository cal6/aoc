package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
	"bufio"
	"os"
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
	for i := 0; i < len(chain); {
		action := chain[i] % 100
		param1 := chain[i] >= 100
		param2 := chain[i] >= 1000
		param3 := chain[i] >= 10000
		fmt.Println("debug", i, chain[i], action, param1, param2, param3)
		if action == 1 || action == 2 {
			var1   := chain[i+1]
			if !param1 { var1 = chain[var1] }
			var2   := chain[i+2]
			if !param2 { var2 = chain[var2] }
			target := i+3
			if !param3 { target = chain[target] }
			if action == 1 { chain[target] = var1 + var2 }
			if action == 2 { chain[target] = var1 * var2 }
			i += 4
		} else if action == 3 {
			target := i+1
			if !param1 { target = chain[target] }
			reader := bufio.NewReader(os.Stdin)
			fmt.Print("Please provide action: ")
			text, _ := reader.ReadString('\n')
			text = strings.Replace(text, "\n", "", -1)
			num, _ := strconv.Atoi(text);
			chain[target] = num
			i += 2
		} else if action == 4 {
			target := i+1
			if !param1 { target = chain[target] }
			fmt.Println("Output", i, chain[target])
			i += 2
		} else if action == 99 {
			return chain[0]
		} else {
			panic(fmt.Sprintf("Unknown action", action))
		}
	}
	return chain[0]
}

func main () {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil { panic(err) }
	nums := filterarray(strings.Split(string(data), ","))
	res := getresult(nums)
	fmt.Println("result", res)
}
