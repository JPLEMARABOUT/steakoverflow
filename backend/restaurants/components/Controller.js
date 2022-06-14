const resto = require("./Restaurants");
const mongo = require("../../generic_components/MongoAccess");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");

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
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            if (result.level === 1){
                let rest = new resto("resto");
                await rest.bind(JSON.parse(req.query["data"]));
                await rest.insertDb();
                res.send(JSON.stringify({success:true}));
            } else {
                res.send(403).send(JSON.stringify({success:false, message:"Permission missing"}))
            }
        } else {
            res.status(404).send(JSON.stringify(result))
        }
    });
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