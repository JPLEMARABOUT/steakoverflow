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
    carte;
    patron;
}

class Restaurants extends Structures{

    constructor() {
        super();
        this.carte = {};
    }

    async bind(formData, calback){
        this.name = formData.name;
        this.address = formData.address;
        this.commune = formData.commune;
        if (formData.carte !== undefined){
            this.carte = formData.carte;
        }
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
            this.location = [parseFloat(result.lon), parseFloat(result.lat)]
        } else {
            this.location = formData.location;
        }

        if (calback !==undefined){
            await calback(this);
        }
    }

    async retrieve(id, params){
        let mg = new MongoAccess();
        await mg.findSpecific({id:id}, async (result)=>{
            let tempCarte = result.carte;
            for (let elem of Object.keys(params)){
                tempCarte[elem] = params[elem];
            }
            result.carte = tempCarte;
            await this.bind(result, this.updateMenu);
        });
    }

    serialize (){
        return Object.fromEntries(Object.entries(this))
    }

    async updateMenu(instance){
        let mg = new MongoAccess();
        await mg.findSpecific({id:instance.id}, async (result)=>{
            await mg.update({carte:instance.carte}, result.id);
        });
    }

    async insertDb() {
        let db = new MongoAccess();
        return await db.insert(this.serialize());
    }
}

module.exports = Restaurants;