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
    }

    async bind(formData){
        this.name = formData.name;
        this.address = formData.address;
        this.commune = formData.commune;
        this.carte = {}
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
    }

    serialize (){
        return Object.fromEntries(Object.entries(this))
    }

    async updateMenu(){
        //todo : mettre en place la possibilité d'update les menus
    }

    async insertDb() {
        let db = new MongoAccess();
        return await db.insert(this.serialize());
    }
}

module.exports = Restaurants;