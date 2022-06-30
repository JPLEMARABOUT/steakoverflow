const resto = require("./Restaurants");
const mongo = require("../../generic_components/MongoAccess");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const roles = require("../../generic_components/rolePermissionManager")

//###############################Data retrievance

async function getRestaurantList(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("CREATE_ESTABLISHMENT")
            if (rules.hasRole){
                let rest = new resto("resto");
                await rest.bind(JSON.parse(req.query["data"]));
                await rest.insertDb();
                res.status(200).send(JSON.stringify({success:true}));
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

async function deleteRestaurant(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let rest = new resto();
    await rest.delete(req.params["id"], parseInt(req.query["id"]));
    res.send(JSON.stringify({success:true}));
}

async function updateRestaurantInfos(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let rest = new resto("resto");
    await rest.retrieve(req.params["id"], JSON.parse(req.query["changes"]), parseInt(req.query["id"]));
    res.send(JSON.stringify({success:true}));
}

module.exports = {registerRestaurant, getRestaurantList, deleteRestaurant, updateRestaurantInfos}