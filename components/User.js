class User{

    token;
    username;
    email;
    password;
    birthdate;
    prenom;
    nom;

    jsonise(){
        return JSON.stringify({"Token":this.token, "Username": this.username, "Email": this.email, "Password" : this.password,
            "Birthdate" : this.birthdate, "Prenom" : this.prenom, "Nom" : this.nom});
    }

}

module.exports = User;