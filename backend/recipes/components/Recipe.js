const Transcoder = require("../../generic_components/Transcoder");
const MongoAccess = require("../../generic_components/MongoAccess");

class Recipe{

    ingredients = [];
    price;
    id;
    name;
    restaurant_id;
    prop_id;
    type;
    image;

    async bind(data, callback=undefined){
        if (data.restaurant_id === undefined || data.prop_id === undefined){
            return 0
        }
        this.image = data.image;
        this.type = data.type;
        this.ingredients = data.ingredients;
        this.price = data.price;
        this.name = data.name;
        this.restaurant_id = data.restaurant_id;
        this.prop_id = data.prop_id;

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

    async checkIfRecipeExists(recipe_id, callback){
        let mongo = new MongoAccess("recipes");
        await mongo.findAll(callback, {id:recipe_id});
    }

    async insertDb(data, webCallback){
        await this.checkIfRestaurantExists(data.restaurant_id,async (rest)=>{
            if (rest===null){
                webCallback({success:false, message:"Restaurant doesn't exist"});
                return
            }
            let mongo = new MongoAccess("recipes");
            let result = await this.bind(data);
            if (result === 0){
                webCallback({success:false, message:"No restaurant was specified!"});
                return
            }
            await this.checkIfRecipeExists(this.id,async (result)=>{
                if (typeof result === "object" && result.length>0){
                    webCallback({success:false, message:"Recipe already exists"});
                    return
                }
                await mongo.insert(this.serialize());
                webCallback({success:true, message:"Ok"});
            });
        });
    }

    async update(instance){
        let mg = new MongoAccess("recipes");
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update(instance.serialize(), result.id);
        });
    }

    async delete(id, prop_id){
        let mg = new MongoAccess("recipes");
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

    async retrieve(id, params, userid){
        let mg = new MongoAccess("recipes");
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

module.exports = Recipe;