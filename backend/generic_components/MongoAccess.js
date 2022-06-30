const {MongoClient} = require("mongodb");
let address = "localhost"
let port = 27017;
if (process.env.environement==="docker"){
    address = "host.docker.internal";
}

class MongoAccess{

    uri;
    client;
    database;

    constructor(table) {
        this.uri = `mongodb://${address}:${port}`;
        this.database = "proyo"
        this.table = table;
        this.client = new MongoClient(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        });
    }

    async insert(obj){
        await this.#genericFunction((dbo)=>{
            dbo.collection(this.table).insertOne(obj, (err)=>{
                if (err) throw err
            });
        })
    }

    async update(obj, id){
        await this.#genericFunction((dbo)=>{
           dbo.collection(this.table).updateOne({id:id}, {
               $set : obj
           });
        });
    }

    async deleteEntry(constraint){
        await this.#genericFunction((dbo)=>{
            dbo.collection(this.table).deleteMany(constraint);
        });
    }

    async findSpecific(constraint, callback){
        await this.#genericFunction((dbo)=>{
            dbo.collection(this.table).findOne(constraint, (err, result)=>{
                if (err) throw err;
                callback(result)
            });
        });
    }

    async findAll(callback, constraint){
        await this.#genericFunction((dbo) => {
            dbo.collection(this.table).find(constraint).toArray((err, result)=>{
                if (err) throw err;
                callback(result)
            });
        });
    }

    async findAllSorted(callback, constraint, sort){
        await this.#genericFunction((dbo)=>{
            dbo.collection(this.table).find(constraint).sort(sort).toArray((err, result)=>{
                if (err) throw err;
                callback(result)
            });
        });
    }

    async #genericFunction(callback){
        try {
            await this.client.connect((err, db)=>{
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