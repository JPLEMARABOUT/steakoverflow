const Transcoder = require("./Transcoder");

class User{

    token;
    username;
    email;
    password;
    birthdate;
    prenom;
    nom;
    id;

    constructor(formData) {
        if (formData.id === undefined) {
            let cyph = new Transcoder();
            this.id = cyph.base64Encode(cyph.sha256cyph(JSON.stringify(this.serialize())))
        } else {
            this.id = formData.id;
        }
    }

    serialize (){
        return Object.fromEntries(Object.entries(this));
    }

    hashPass(){
        let trsc = new Transcoder();
        this.password = trsc.sha256cyph(this.password);
    }

}

module.exports = User;