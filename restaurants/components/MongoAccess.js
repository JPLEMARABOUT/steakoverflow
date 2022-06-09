const {MongoClient} = require("mongodb");

class MongoAccess{

    uri;
    client;
    database;

    constructor(table) {
        this.uri = `mongodb://localhost:27017`;
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

    async dropDb(){
        await this.#genericFunction((dbo)=>{
            dbo.collection(this.table).drop();
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