const Transcoder = require("../../generic_components/Transcoder");
const MongoAccess = require("../../generic_components/MongoAccess");

class Menu{

    dish_list = [];
    price = 0
    restaurant_id;
    prop_id;
    id;

    async bind(data, callback=undefined){
        if (data.restaurant_id === undefined || data.prop_id === undefined){
            return 0
        }
        this.dish_list = data.dish_list;
        this.price = data.price;
        this.restaurant_id = data.restaurant_id;
        this.prop_id = data.prop_id;

        if (data.id === undefined) {
            let cph = new Transcoder();
            this.id = cph.base64Encode(cph.sha256cyph(JSON.stringify(this.serialize())))
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

    async checkIfMenuExists(menu_id, callback){
        let mongo = new MongoAccess("menu");
        await mongo.findAll(callback, {id:menu_id});
    }

    async insertDb(data, webCallback){
        await this.checkIfRestaurantExists(data.restaurant_id,async (rest)=>{
            if (rest===null){
                webCallback({success:false, message:"Restaurant doesn't exist"});
                return
            }
            let mongo = new MongoAccess("menu");
            let result = await this.bind(data);
            if (result === 0){
                webCallback({success:false, message:"No restaurant was specified!"});
                return
            }
            await this.checkIfMenuExists(this.id,async (result)=>{
                if (typeof result === "object" && result.length>0){
                    webCallback({success:false, message:"Menu already exists"});
                    return
                }
                await mongo.insert(this.serialize());
                webCallback({success:true, message:"Ok"});
            });
        });
    }

    async delete(id, prop_id){
        let mg = new MongoAccess("menu");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result === null){
                return
            }
            if (prop_id !== result.prop_id){
                return;
            }
            await mg.deleteEntry({id:id});
        });
    }

    async update(instance){
        let mg = new MongoAccess("menu");
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update(instance.serialize(), result.id);
        });
    }

    async retrieve(id, params, userid){
        let mg = new MongoAccess("menu");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result===null){
                return;
            }
            if (userid !== result.prop_id){
                return;
            }
            for (let elem of Object.keys(params)){
                result[elem] = params[elem];
            }
            await this.bind(result, this.update);
        });
    }

    serialize (){
        return Object.fromEntries(Object.entries(this));
    }


}

module.exports = Menu;