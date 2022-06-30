const Transcoder = require("../../generic_components/Transcoder");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
let address = "localhost";
if (process.env.environement==="docker"){
    address = "host.docker.internal";
}

class User{

    username;
    email;
    password;
    birthdate;
    prenom;
    nom;
    level;
    id;
    has_conf;
    adding_time;

    bind(formData, callback = undefined){
        this.email = formData.email;
        this.username = formData.username;
        this.birthdate = formData.birthdate;
        this.prenom = formData.prenom;
        this.nom = formData.nom;
        this.password = formData.password;


        if (formData.id !== undefined){
            this.id = formData.id
        } else {
            this.id = 0
        }

        if (formData.level !== undefined){
            this.level = formData.level
        } else {
            this.level = 0
        }

        if (formData.has_conf !== undefined){
            this.has_conf = formData.has_conf
        } else {
            this.has_conf = 0
        }

        if (formData.adding_time !== undefined){
            this.adding_time = formData.adding_time
        } else {
            this.adding_time = 0
        }

        if (callback !== undefined){
            callback(this);
        }
    }

    register(data, webcallback){
        data.password = User.#hashPass(data.password);
        this.bind(data, async (instance)=>{
            let db = new SGBDRConnect();
            await db.insertData(JSON.stringify(instance.serialize()), webcallback)
        });
    }

    async update(data, webCallback){
        let db = new SGBDRConnect();
        await db.getUser(data.id, (result)=>{
            if (data.password !== undefined){
                data.password = User.#hashPass(data.password)
            }
            const keys = Object.keys(data);
            for (let elem of keys){
                result[elem] = data[elem];
            }
            this.bind(result, async (instance)=>{
                let db = new SGBDRConnect();
                await db.Update(JSON.stringify(instance.serialize()), webCallback)
            });
        })
    }

    async connect(email, password, webCallback){
        password = User.#hashPass(password);
        let db = new SGBDRConnect();
        await db.logUser(email, password, webCallback);
    }

    async retrieve(customid, webCallback){
        let db = new SGBDRConnect();
        await db.getUser(customid, webCallback);
    }

    async changeElevation(id, level, webcallback){
        let db = new SGBDRConnect();
        await db.getUser(id, (result)=>{
            result.level = parseInt(level);
            this.bind(result, (instance)=>{
                db.Update(JSON.stringify(instance.serialize()), webcallback);
            });
        });
    }

    async confirm(id, webcallback){
        let db = new SGBDRConnect();
        await db.getUser(id, (result)=>{
            result.has_conf = 1;
            this.bind(result, (instance)=>{
                db.Update(JSON.stringify(instance.serialize()), webcallback);
            });
        });
    }

    serialize (){
        return Object.fromEntries(Object.entries(this));
    }

    static #hashPass(pass){
        let trsc = new Transcoder();
        return trsc.base64Encode(trsc.sha256cyph(pass));
    }
}

module.exports = User;
