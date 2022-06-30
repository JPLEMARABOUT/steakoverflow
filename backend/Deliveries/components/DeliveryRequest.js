const MongoAccess = require("../../generic_components/MongoAccess");
const Transcoder = require("../../generic_components/Transcoder");

class DeliveryRequest{

    id;
    prop;
    restaurant_id;

    async bind(data){
        if (data.restaurant === undefined || data.prop===undefined){
            return 0;
        }

        this.restaurant_id = data.restaurant;
        this.prop = data.prop;
        if (data.id === undefined){
            let cyph = new Transcoder();
            this.id = cyph.base64Encode(cyph.sha256cyph(JSON.stringify(this.serialize())))
        } else {
            this.id = data.id;
        }
    }

    async insertDb(data, webCallback){
        let mongo = new MongoAccess("delivery_requests");
        let result = await this.bind(data);
        if (result === 0){
            webCallback({success:false, message:"No dest or deliverer was specified"});
            return
        }
        await mongo.insert(this.serialize());
        webCallback({success:true, message:"Ok"});
    }

    serialize (){
        return Object.fromEntries(Object.entries(this));
    }

}

module.exports = DeliveryRequest;