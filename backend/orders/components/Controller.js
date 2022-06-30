const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const roles = require("../../generic_components/rolePermissionManager");
const Order = require("./Order");
const mongo = require("../../generic_components/MongoAccess");
const AnalyseTool = require("./AnalyseTool")

async function createOrder(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("CREATE_ORDER")
            if (rules.hasRole){
                let order = new Order();
                await order.insertDb(JSON.parse(req.query["data"]), (result)=>{
                    res.status(200).send(JSON.stringify(result));
                })
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

async function listOrders(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("orders");
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

async function updateOrder(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let order = new Order();
    await order.retrieve(req.query["order"], JSON.parse(req.query["data"]), parseInt(req.query["id"]));
    res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
}

async function deleteOrder(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let order = new Order()
    await order.delete(req.query["order"], parseInt(req.query["id"]), (result)=>{
        res.send(JSON.stringify(result))
    });
}

async function pay(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let order = new Order();
    await order.Pay(req.query["order"], parseInt(req.query["id"]), JSON.parse(req.query["data"]));
    res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
}

async function validate(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("CONFIRM_ORDER");
            if (rules.hasRole){
                let order = new Order();
                await order.validate(req.query["order"], req.query["restaurant"], (result)=>{
                   res.status(200).send(JSON.stringify(result))
                });
                res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

//##############################ANALYSE

async function getOrderHistoryUser(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.params["type"]==="restaurant"){
        next();
        return;
    } else if(req.params["type"]!=="user"){
        res.status(200).send(JSON.stringify({success:false, message:"Specified parameter unknown, parameter must be either 'restaurant' or 'user'"}));
        return;
    }
    let mg = new mongo("orders");
    await mg.findAllSorted((result)=>{
        for (let elem of result){
            delete elem["_id"];
        }
        res.status(200).send(JSON.stringify(result));
    }, {client_id:parseInt(req.query["id"])}, {creation_date:-1});
}

async function getOrderHistoryRest(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("orders");
    await mg.findAllSorted((result)=>{
        for (let elem of result){
            delete elem["_id"];
        }
        res.status(200).send(JSON.stringify(result));
    }, {restaurant_id:req.query["resto"]}, {creation_date:-1});
}

//#################################STATS

async function generateStats(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("GET_STAT")
            if (rules.hasRole){
                let mg = new mongo("orders");
                await mg.findAllSorted((result)=>{
                    for (let elem of result){
                        delete elem["_id"];
                    }
                    let analyse = new AnalyseTool(result);
                    let stats = analyse.getFavoriteDishes().getMeanOrderValue().getMostLoadDaysAndHours().getStats();
                    res.status(200).send(JSON.stringify(stats));
                }, {restaurant_id:req.query["restaurant"]}, {creation_date:-1});
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

module.exports = {createOrder, listOrders, updateOrder, deleteOrder, pay, validate, getOrderHistoryRest, getOrderHistoryUser, generateStats}