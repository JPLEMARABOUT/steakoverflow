package main

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

const (
	USERNAME = "root"
	PASSWORD = ""
	DBNAME   = "PROYO"
	PORT     = "3306"
	HOST     = "host.docker.internal"
	//HOST = "localhost"
)

var db *sql.DB

func checkIfNotUserExistsDB(userdata User) bool {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	stmt, err := db.Query("SELECT * FROM `user` WHERE EMAIL=?", userdata.Email)
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var user User
	for stmt.Next() {
		err = stmt.Scan(&user.Id, &user.Username, &user.Email, &user.Birthdate, &user.Nom, &user.Prenom, &user.Level, &user.Password, &user.Hasconf, &user.AddingTIme)
		check(err)
	}
	return user.Id == 0
}

func checkIfIdExists(id string) bool {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	stmt, err := db.Query("SELECT * FROM `user` WHERE ID=?", id)
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var user User
	for stmt.Next() {
		err = stmt.Scan(&user.Id, &user.Username, &user.Email, &user.Birthdate, &user.Nom, &user.Prenom, &user.Level, &user.Password, &user.Hasconf, &user.AddingTIme)
		check(err)
	}
	return user.Id != 0
}

func insertUserDb(usr User) {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	_, err := db.Query("INSERT INTO `user`(`USERNAME`,`NOM`,`PRENOM`,`BIRTHDATE`,`EMAIL`,`PASSWORD`,`LEVEL`,`HAS_CONF`,`ADDING_TIME`) VALUES (?,?,?,?,?,?,?,?,?)",
		usr.Username, usr.Nom, usr.Prenom, usr.Birthdate, usr.Email, usr.Password, usr.Level, 1, time.Now().Unix())
	check(err)
}

func getLastUser() int {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)

	stmt, err := db.Query("SELECT ID FROM user WHERE 1 ORDER BY ID DESC LIMIT 1")
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var id int
	for stmt.Next() {
		err := stmt.Scan(&id)
		check(err)
	}
	return id
}

func updateUserDb(usr User) {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	_, err := db.Query("UPDATE `user` SET `USERNAME`=?,`NOM`=?,`PRENOM`=?,`BIRTHDATE`=?,`EMAIL`=?,`PASSWORD`=?,`LEVEL`=?, `HAS_CONF`=? WHERE user.ID = ?",
		usr.Username, usr.Nom, usr.Prenom, usr.Birthdate, usr.Email, usr.Password, usr.Level, usr.Hasconf, usr.Id)
	check(err)
}

func deleteUserDb(id string) {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	_, err := db.Query("DELETE FROM `user` WHERE user.ID=?", id)
	check(err)
}

func getUserListDb() []User {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	stmt, err := db.Query("SELECT * FROM user WHERE 1")
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var userList []User
	for stmt.Next() {
		var user User
		err = stmt.Scan(&user.Id, &user.Username, &user.Email, &user.Birthdate, &user.Nom, &user.Prenom, &user.Level, &user.Password, &user.Hasconf, &user.AddingTIme)
		check(err)
		userList = append(userList, user)
	}
	return userList
}

func logUserDb(email, password string) User {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	stmt, err := db.Query("SELECT * FROM `user` WHERE EMAIL=? AND PASSWORD=?", email, password)
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var user User
	for stmt.Next() {
		err = stmt.Scan(&user.Id, &user.Username, &user.Email, &user.Birthdate, &user.Nom, &user.Prenom, &user.Level, &user.Password, &user.Hasconf, &user.AddingTIme)
		check(err)
	}
	return user
}

func findUserById(id string) User {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)
	stmt, err := db.Query("SELECT * FROM `user` WHERE ID=?", id)
	check(err)
	defer func(stmt *sql.Rows) {
		err := stmt.Close()
		check(err)
	}(stmt)
	var user User
	for stmt.Next() {
		err = stmt.Scan(&user.Id, &user.Username, &user.Email, &user.Birthdate, &user.Nom, &user.Prenom, &user.Level, &user.Password, &user.Hasconf, &user.AddingTIme)
		check(err)
	}
	return user
}

func deleteOldEntriesDB() {
	db, _ = sql.Open("mysql", USERNAME+":"+PASSWORD+"@tcp("+HOST+":"+PORT+")/"+DBNAME)
	defer func(db *sql.DB) {
		err := db.Close()
		check(err)
	}(db)

	_, err := db.Query("DELETE FROM `user` WHERE ABS(DATEDIFF(FROM_UNIXTIME(user.ADDING_TIME), FROM_UNIXTIME(?)))>30 AND user.HAS_CONF=0", time.Now().Unix())
	check(err)
}
