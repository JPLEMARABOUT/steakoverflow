const resto = require("./Restaurants");
const mongo = require("../../generic_components/MongoAccess");

//###############################Data retrievance

async function getRestaurantList(req, res){
    let mg = new mongo("resto");
    let constraint = {};
    if (req.query["constraint"] !== undefined){
        constraint = JSON.parse(req.query["constraint"]);
    }
    await mg.findAll((result)=>{
        for (let elem of result){
            delete elem["_id"];
        }
        res.send(JSON.stringify(result));
    }, constraint);
}

//############################Interractions

async function registerRestaurant(req, res){
    let rest = new resto("resto");
    await rest.bind(JSON.parse(req.query["data"]));
    await rest.insertDb();
    res.send(JSON.stringify({success:true}));
}

async function deleteRestaurant(req, res){
    let rest = new resto();
    await rest.delete(req.params["id"], req.query["patron"]);
    res.send(JSON.stringify({success:true}));
}

async function updateRestaurantInfos(req, res){
    let rest = new resto("resto");
    await rest.retrieve(req.params["id"], JSON.parse(req.query["changes"]), req.query["patron"]);
    res.send(JSON.stringify({success:true}));
}

//CLEAR FUNC

async function clearDB(req, res){
    let db = new mongo("resto");
    await db.dropDb()

    res.send("yo")
}

module.exports = {registerRestaurant, getRestaurantList, deleteRestaurant, updateRestaurantInfos, clearDB}