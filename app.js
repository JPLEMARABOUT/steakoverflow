const express = require("express");
const app = express()

const Transcoder = require("./components/Transcoder");
const resto = require("./components/Restaurants");
const mongo = require("./components/MongoAccess");

const Controller = require("./components/Controller")

const consts = {"port": 8080}

app.get("/", async (req, res) => {
    let mg = new mongo();
    // await mg.dropDb()
    await mg.findAll()


    res.send("yo brat")
});

app.get("/test", Controller.test);

app.get("/user/:userid", (req, res)=>{
    res.send(req.params["userid"]);
    //todo : if userid not in bdd alors rediriger vers la connexion
    res.redirect("/")
});

app.post("/signup", (req, res)=>{
    let transco = new Transcoder()
    res.send(transco.base64Decode(req.query["data"]))
});

//##############################OFFICIEL API

app.post("/register_resto", Controller.registerRestaurant);

app.post("/update_card", Controller.addRecipe);

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
})