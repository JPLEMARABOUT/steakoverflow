const resto = require("./Restaurants");
const mongo = require("./MongoAccess");
const {query} = require("express");

async function test(req, res){
    console.log("a")
    res.send("salut gros")
}

function registerUser(req, res){

}

async function addRecipe(req, res){
    let rest = new resto();
    await rest.retrieve(req.query["id"], JSON.parse(req.query["carte"]));
    res.send(JSON.stringify({success:true}))
}

async function registerRestaurant(req, res){
    let rest = new resto();
    await rest.bind(JSON.parse(req.query["data"]));
    await rest.insertDb();
    res.send(JSON.stringify({success:true}));
}

module.exports = {test, registerUser, registerRestaurant, addRecipe}