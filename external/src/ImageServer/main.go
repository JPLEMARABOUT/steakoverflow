package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gookit/color"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
)

type success struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func (scs success) json() []byte {
	jsondat, err := json.Marshal(scs)
	check(err)
	return jsondat
}

func check(err error) {
	if err != nil {
		color.Red.Println(err.Error())
	}
}

func init() {
	_, err := os.Stat("./IMG")
	if os.IsNotExist(err) {
		err := os.Mkdir("./IMG", 0755)
		check(err)
	}
}

func main() {
	http.HandleFunc("/receive_image", receiveImage)
	http.HandleFunc("/send_image", sendImage)

	fmt.Println("Serving on port 5002")
	err := http.ListenAndServe(":5002", nil)
	check(err)
}

func receiveImage(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(32 << 20)
	check(err)

	var buf bytes.Buffer
	file, header, err := r.FormFile("file")
	check(err)
	defer func(file multipart.File) {
		err := file.Close()
		check(err)
	}(file)

	filetype := strings.Split(header.Filename, ".")[1]
	if filetype != "jpg" && filetype != "png" {
		_, err = w.Write(success{Success: false, Message: "Filetype not allowed"}.json())
		check(err)
		return
	}

	if _, err := os.Stat(fmt.Sprintf("./IMG/%s", header.Filename)); err == nil {
		_, err = w.Write(success{Success: false, Message: "File already exists"}.json())
		check(err)
		return
	}

	_, err = io.Copy(&buf, file)
	check(err)
	contents := buf.String()

	f, err := os.Create(fmt.Sprintf("./IMG/%s", header.Filename))
	check(err)
	defer func(f *os.File) {
		err := f.Close()
		check(err)
	}(f)
	_, err = f.WriteString(contents)
	check(err)

	buf.Reset()
	_, err = w.Write(success{Success: true, Message: header.Filename}.json())
	check(err)
}

func sendImage(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}

	fileBytes, err := ioutil.ReadFile(fmt.Sprintf("./IMG/%s", argsMap["imgurl"]))
	check(err)
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/octet-stream")
	_, err = w.Write(fileBytes)
	check(err)
}
