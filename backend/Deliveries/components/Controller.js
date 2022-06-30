const Delivery = require("./Delivery");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const roles = require("../../generic_components/rolePermissionManager");
const mongo = require("../../generic_components/MongoAccess");
const DeliveryRequest = require("./DeliveryRequest")

async function createDelivery(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("ACCEPT_DELIVERY")
            if (rules.hasRole){
                let delivery = new Delivery();
                await delivery.insertDb(JSON.parse(req.query["data"]), (result)=>{
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

async function getDelivery(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("deliveries");
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

async function updateDelivery(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let delivery = new Delivery();
    await delivery.retrieve(req.query["delivery"], JSON.parse(req.query["data"]), parseInt(req.query["id"]));
    res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
}

async function deleteDelivery(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let delivery = new Delivery();
    await delivery.delete(req.query["delivery"], parseInt(req.query["id"]), (result)=>{
        res.send(JSON.stringify(result))
    });
}

async function createDeliveryRequest(req , res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("REQUEST_DELIVERY");
            if (rules.hasRole){
                let delivery_req = new DeliveryRequest();
                await delivery_req.insertDb(JSON.parse(req.query["data"]), (result)=>{
                    res.status(200).send(JSON.stringify(result));
                });
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

async function getRequestedDeliveriies(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("delivery_requests");
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

module.exports = {createDelivery, getDelivery, updateDelivery, deleteDelivery, getRequestedDeliveriies, createDeliveryRequest};