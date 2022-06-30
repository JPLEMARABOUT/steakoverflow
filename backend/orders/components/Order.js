const Transcoder = require("../../generic_components/Transcoder");
const MongoAccess = require("../../generic_components/MongoAccess");

class Order{

    id;
    client_id;
    restaurant_id;
    manifest;
    price;
    payed;
    validated;
    current_status;
    deliverer;
    creation_date;

    async bind(data, callback=undefined){
        if (data.restaurant_id === undefined || data.client_id === undefined){
            return 0
        }

        this.client_id = data.client_id;
        this.restaurant_id = data.restaurant_id;
        this.manifest = data.manifest;
        this.price = data.price;

        this.payed = (data.payed===undefined? false : data.payed);
        this.validated = (data.validated===undefined? false : data.validated);
        this.current_status = (data.current_status===undefined? "PENDING" : data.current_status);
        this.deliverer = (data.deliverer===undefined? undefined : data.deliverer)

        this.creation_date = (data.creation_date===undefined? Date.now() : data.creation_date)

        if (data.id === undefined) {
            let cyph = new Transcoder();
            this.id = cyph.base64Encode(cyph.sha256cyph(JSON.stringify(this.serialize())))
        } else {
            this.id = data.id;
        }
        if (callback !== undefined){
            callback(this)
        }
    }

    async checkIfRestaurantExists(restaurant_id,callback){
        let mongo = new MongoAccess("resto");
        await mongo.findSpecific({id:restaurant_id}, callback)
    }

    async insertDb(data, webCallback){
        await this.checkIfRestaurantExists(data.restaurant_id,async (rest)=>{
            if (rest===null){
                webCallback({success:false, message:"Restaurant doesn't exist"});
                return
            }
            let mongo = new MongoAccess("orders");
            let result = await this.bind(data);
            if (result === 0){
                webCallback({success:false, message:"No restaurant was specified!"});
                return
            }
            await mongo.insert(this.serialize());
            webCallback({success:true, message:"Ok"});
        });
    }

    async update(instance){
        let mg = new MongoAccess("orders");
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update(instance.serialize(), result.id);
        });
    }

    async delete(id, prop_id, callback){
        let mg = new MongoAccess("orders");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result === null){
                callback({success:false, message:"Specified order doesn't exist"});
                return
            }
            if (prop_id !== result.client_id){
                callback({success:false, message:"You're not the owner of this command"})
                return;
            }
            if (result.payed){
                callback({success:false, message:"Cannot cancel the order anymore"});
                return
            }
            await mg.deleteEntry({id:id});
            callback({success:true, message:"Ok"});
        });
    }

    async retrieve(id, params, userid){
        let mg = new MongoAccess("orders");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result===null){
                return;
            }
            if (userid !== result.client_id){
                return;
            }
            for (let elem of Object.keys(params)){
                result[elem] = params[elem];
            }
            await this.bind(result, this.update);
        });
    }

    async Pay(id, client_id, data){
        let mg = new MongoAccess("orders");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result===null){
                return;
            }
            if (client_id !== result.client_id){
                return;
            }
            //Controlle bancaire
            console.log(data)
            result.payed = true;
            await this.bind(result, this.update);
        });
    }

    async validate(id, resto, errCallback){
        let mg = new MongoAccess("orders");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result===null){
                return;
            }
            if (resto !== result.restaurant_id){
                errCallback({success:false, message:"This order doenst'belong to this restaurant"});
                return;
            }
            if (!result.payed){
                errCallback({success:false, message:"This order has not been payed yet"});
                return;
            }
            result.validated = true;
            await this.bind(result, this.update);
        });
    }


    serialize (){
        return Object.fromEntries(Object.entries(this));
    }

}

module.exports = Order;