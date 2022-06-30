package main

import "github.com/gookit/color"

func check(err error) {
	if err != nil {
		color.Red.Println(err.Error())
	}
}
