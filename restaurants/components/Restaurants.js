const MongoAccess = require("./MongoAccess");
const Transcoder = require("./Transcoder");

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

class Structures{
    id;
    name;
    location;
    address;
    commune;
    patron;
}

class Restaurants extends Structures{

    constructor() {
        super();
    }

    async bind(formData, calback){
        this.name = formData.name;
        this.address = formData.address;
        this.commune = formData.commune;
        this.patron = formData.patron;

        if (formData.id === undefined) {
            let cyph = new Transcoder();
            this.id = cyph.base64Encode(cyph.sha256cyph(JSON.stringify(this.serialize())))
        } else {
            this.id = formData.id;
        }

        if (formData.location === undefined) {
            const address = `${this.address.replaceAll(" ", "+")}+${this.commune}`.toLowerCase();
            let result = await $.post(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`);
            result = result[0];
            this.location = [parseFloat(result["lon"]), parseFloat(result["lat"])]
        } else {
            this.location = formData.location;
        }

        if (calback !==undefined){
            await calback(this);
        }
    }

    async delete(id, patronid){
        let mg = new MongoAccess("resto");
        await mg.findSpecific({id:id}, async (result)=>{
            if (patronid !== result.patron){
                return;
            }
            await mg.deleteEntry({id:id});
        });
    }

    async retrieve(id, params, patronid){
        let mg = new MongoAccess("resto");
        await mg.findSpecific({id:id}, async (result)=>{
            if (patronid !== result.patron){
                return;
            }
            for (let elem of Object.keys(params)){
                result[elem] = params[elem];
            }
            await this.bind(result, this.update);
        });
    }

    async update(instance){
        let mg = new MongoAccess("resto");
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update(instance.serialize(), result.id);
        });
    }

    serialize (){
        return Object.fromEntries(Object.entries(this))
    }

    async insertDb() {
        let db = new MongoAccess("resto");
        return await db.insert(this.serialize());
    }
}

module.exports = Restaurants;