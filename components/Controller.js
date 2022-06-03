const resto = require("./Restaurants");
const mongo = require("./MongoAccess");

async function registerRestaurant(req, res){
    let rest = new resto("resto");
    await rest.bind(JSON.parse(req.query["data"]));
    await rest.insertDb();
    res.send(JSON.stringify({success:true}));
}

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

async function deleteRestaurant(req, res){
    let mg = new mongo("resto");
    await mg.deleteEntry({id:req.query["id"]});
    res.send(JSON.stringify({success:true}));
}

async function updateRestaurantInfos(req, res){
    let rest = new resto("resto");
    await rest.retrieve(req.query["id"], JSON.parse(req.query["changes"]));
    res.send(JSON.stringify({success:true}));
}

module.exports = {registerRestaurant, getRestaurantList, deleteRestaurant, updateRestaurantInfos}