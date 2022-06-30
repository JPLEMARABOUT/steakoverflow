package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

const HOSTPORT = "5000"

func main() {
	http.HandleFunc("/insert_user", insertUser)
	http.HandleFunc("/list_user", getUserList)
	http.HandleFunc("/update_user", updateUser)
	http.HandleFunc("/delete_user", deleteUser)
	http.HandleFunc("/match_user_and_retrieve", logUser)
	http.HandleFunc("/get_user", getUser)
	http.HandleFunc("/delete_old_entries", deteteOldEntries)

	fmt.Println("Started serving on port " + HOSTPORT + "...")

	err := http.ListenAndServe(":"+HOSTPORT, nil)
	check(err)
}

//################################ROUTER

func insertUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}
	var data User
	err := json.Unmarshal([]byte(argsMap["data"]), &data)
	check(err)
	if checkIfNotUserExistsDB(data) {
		insertUserDb(data)
		newid := getLastUser()
		result := specialsuccess{Success: true, Message: "Ok", Id: newid}
		_, err = w.Write(result.json())
		check(err)
	} else {
		result := success{Success: false, Message: "Email already used"}
		_, err = w.Write(result.json())
		check(err)
	}

}

func updateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}
	var data User
	err := json.Unmarshal([]byte(argsMap["data"]), &data)
	check(err)

	if checkIfIdExists(strconv.Itoa(data.Id)) {
		updateUserDb(data)
		result := success{Success: true, Message: "Ok"}
		_, err = w.Write(result.json())
	} else {
		result := success{Success: false, Message: "User not found in database"}
		_, err = w.Write(result.json())

	}
	check(err)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}

	if checkIfIdExists(argsMap["id"]) {
		deleteUserDb(argsMap["id"])
		result := success{Success: true, Message: "Ok"}
		_, err := w.Write(result.json())
		check(err)
	} else {
		result := success{Success: false, Message: "User not found in database"}
		_, err := w.Write(result.json())
		check(err)
	}
}

func getUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}

	if checkIfIdExists(argsMap["id"]) {
		resultLog := findUserById(argsMap["id"])
		if resultLog.Id == 0 {
			scs := success{Success: false, Message: "User not found"}
			_, err := w.Write(scs.json())
			check(err)
		} else {
			_, err := w.Write([]byte(resultLog.json()))
			check(err)
		}
	} else {
		result := success{Success: false, Message: "User not found in database"}
		_, err := w.Write(result.json())
		check(err)
	}
}

func logUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}
	argsMap := make(map[string]string)
	for id, elem := range r.URL.Query() {
		argsMap[id] = elem[0]
	}

	resultLog := logUserDb(argsMap["email"], argsMap["password"])
	if resultLog.Id == 0 {
		scs := success{Success: false, Message: "User not found"}
		_, err := w.Write(scs.json())
		check(err)
	} else {
		_, err := w.Write([]byte(resultLog.json()))
		check(err)
	}
}

func getUserList(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}

	users := getUserListDb()

	type userList struct {
		Users []User `json:"users"`
	}
	usr := userList{Users: users}
	jsondat, err := json.Marshal(usr)
	check(err)

	_, err = w.Write(jsondat)
	check(err)
}

func deteteOldEntries(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(405)
		return
	}

	deleteOldEntriesDB()

	result := success{Success: true, Message: "Ok"}
	_, err := w.Write(result.json())
	check(err)
}
