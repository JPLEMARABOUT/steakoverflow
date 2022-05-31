const resto = require("./Restaurants");

async function test(req, res){
    console.log("a")
    res.send("salut gros")
}

function registerUser(req, res){

}

async function registerRestaurant(req, res){
    let rest = new resto();
    await rest.bind(JSON.parse(req.query["data"]));
    console.log(rest.serialize())
    // await rest.insertDb();
    res.send(JSON.stringify({success:true}));
}

module.exports = {test, registerUser, registerRestaurant}