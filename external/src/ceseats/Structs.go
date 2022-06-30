package main

import "encoding/json"

type User struct {
	Id         int    `json:"id"`
	Username   string `json:"username"`
	Nom        string `json:"nom"`
	Prenom     string `json:"prenom"`
	Birthdate  string `json:"birthdate"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Level      int8   `json:"level"`
	Hasconf    int8   `json:"has_conf"`
	AddingTIme int64  `json:"adding_time"`
}

func (user User) json() string {
	jsondat, err := json.Marshal(user)
	check(err)
	return string(jsondat)
}

type success struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func (suc *success) json() []byte {
	jsondat, err := json.Marshal(suc)
	check(err)
	return jsondat
}

type specialsuccess struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Id      int    `json:"id"`
}

func (suc *specialsuccess) json() []byte {
	jsondat, err := json.Marshal(suc)
	check(err)
	return jsondat
}
