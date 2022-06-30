const MongoAccess = require("../../generic_components/MongoAccess");
const Transcoder = require("../../generic_components/Transcoder");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

class Delivery{
    id;
    dest;
    deliverer;
    creation_time;
    status;
    location;
    address;
    restaurant;
    commune;

    async bind(data=undefined){
        if (data.deliverer === undefined || data.dest === undefined || data.restaurant === undefined){
            return 0
        }
        this.deliverer = data.deliverer;
        this.dest = data.dest;
        this.restaurant = data.restaurant;
        this.address = data.address;
        this.commune = data.commune;

        if (data.location === undefined) {
            const address = `${this.address.replaceAll(" ", "+")}+${this.commune}`.toLowerCase();
            let result = await $.post(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`);
            result = result[0];
            this.location = [parseFloat(result["lon"]), parseFloat(result["lat"])]
        } else {
            this.location = data.location;
        }

        this.creation_time = (data.creation_time===undefined? Date.now() : data.creation_time);
        this.status = (data.status===undefined? "ACCEPTED" : data.status);
        if (data.id===undefined){
            let cyph = new Transcoder();
            this.id = cyph.base64Encode(cyph.sha256cyph(JSON.stringify(this.serialize())))
        } else {
            this.id = data.id;
        }
        if (callback !== undefined){
            callback(this)
        }
    }

    async insertDb(data, webCallback){
        let mongo = new MongoAccess("deliveries");
        let result = await this.bind(data);
        if (result === 0){
            webCallback({success:false, message:"No dest or deliverer was specified"});
            return
        }
        await mongo.insert(this.serialize());
        webCallback({success:true, message:"Ok"});
    }

    async update(instance){
        let mg = new MongoAccess("deliveries");
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update(instance.serialize(), result.id);
        });
    }

    async delete(id, prop_id){
        let mg = new MongoAccess("deliveries");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result === null){
                callback({success:false, message:"Specified order doesn't exist"});
                return
            }
            if (prop_id !== result.deliverer){
                callback({success:false, message:"You're not the owner of this command"})
                return;
            }
            await mg.deleteEntry({id:id});
            callback({success:true, message:"Ok"});
        });
    }

    async retrieve(id, params, userid){
        let mg = new MongoAccess("deliveries");
        await mg.findSpecific({id:id}, async (result)=>{
            if (result===null){
                return;
            }
            if (userid !== result.deliverer){
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

module.exports = Delivery;