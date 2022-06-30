const Recipe = require("./Recipe");
const mongo = require("../../generic_components/MongoAccess");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const roles = require("../../generic_components/rolePermissionManager");
const Menu = require("./Menu");

async function createRecipe(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("CREATE_RECIPE")
            if (rules.hasRole){
                let recipe = new Recipe();
                await recipe.insertDb(JSON.parse(req.query["data"]), (result)=>{
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

async function list_recipes(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("recipes");
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

async function update_recipe(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let recipe = new Recipe();
    await recipe.retrieve(req.query["recipe"], JSON.parse(req.query["data"]), parseInt(req.query["id"]));
    res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
}

async function delete_recipes(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let recipe = new Recipe();
    await recipe.delete(req.query["recipe"], parseInt(req.query["id"]));
    res.send(JSON.stringify({success:true, message:"Ok"}));
}

async function getMultiple(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("recipes");
    if (req.query["constraint"]===undefined){
        res.status(200).send(JSON.stringify({success:false, message:"No constraint Specified"}));
        return;
    }
    let constraint = JSON.parse(req.query["constraint"])
    let final = {$or:[]};
    for (let id of Object.keys(constraint)){
        for (let elem of constraint[id]){
            let toAdd = {}
            toAdd[id] = "";
            toAdd[id] = elem
            final.$or.push(toAdd)
        }
    }
    await mg.findAll((result)=>{
        for (let elem of result){
            delete elem["_id"];
        }
        res.send(JSON.stringify(result));
    }, final)
}

//############################# GESTION DES MENUS

async function compose_menu(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("CREATE_MENU")
            if (rules.hasRole){
                let menu = new Menu();
                await menu.insertDb(JSON.parse(req.query["data"]), (result)=>{
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

async function read_menu(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let mg = new mongo("menu");
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

async function update_menu(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let menu = new Menu();
    await menu.retrieve(req.query["menu"], JSON.parse(req.query["data"]), parseInt(req.query["id"]));
    res.status(200).send(JSON.stringify({success:true, message:"Ok"}));
}

async function delete_menu(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let menu = new Menu();
    await menu.delete(req.query["menu"], parseInt(req.query["id"]));
    res.send(JSON.stringify({success:true, message:"Ok"}));
}

module.exports = {createRecipe, list_recipes, delete_recipes, update_recipe, delete_menu, update_menu, compose_menu, read_menu, getMultiple}