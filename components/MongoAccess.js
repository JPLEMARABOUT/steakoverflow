const {MongoClient} = require("mongodb");
const actionLogger = require("./ActionLogger")

class MongoAccess{

    uri;
    client;
    database;

    test;

    constructor() {
        this.test = { id: 0, name: 'Jardin d\'Aline', location:[0,0], address:"33 avenue général de Gaulle", communne:"Villeurbanne", carte : {} }

        this.uri = `mongodb://localhost:27017`;
        this.database = "proyo"
        this.client = new MongoClient(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        });
    }

    async connect(){
        try {
            await this.client.connect((err, db)=>{
                actionLogger("Accessing to DB")
                if (err) throw err;
                let dbo = db.db(this.database)

            });
        } catch (e) {
            console.error(e);
        }
    }

    async insert(obj){
        await this.#genericFunction((dbo)=>{
            dbo.collection("resto").insertOne(obj, (err)=>{
                if (err) throw err
            });
        })
    }

    async dropDb(){
        await this.#genericFunction((dbo)=>{
            dbo.collection("resto").drop();
        });
    }

    async findSpecific(){
        await this.#genericFunction((dbo)=>{
            dbo.collection("resto").findOne({id:0}, (err, result)=>{
                console.log(result)
            });
        });
    }

    async findAll(){
        await this.#genericFunction((dbo) => {
            dbo.collection("resto").find({}).toArray((err, result)=>{
                if (err) throw err;
                console.log(result)
            });
        });
    }

    async #genericFunction(callback){
        try {
            await this.client.connect((err, db)=>{
                actionLogger("Accessing to DB")
                if (err) throw err;
                let dbo = db.db(this.database)
                callback(dbo)
            });
        } catch (e) {
            console.error(e);
        }
    }

}

module.exports = MongoAccess;