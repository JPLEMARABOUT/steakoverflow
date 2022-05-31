const express = require("express");
const app = express()

const Transcoder = require("./components/Transcoder");
const mongo = require("./components/MongoAccess")

const consts = {"port": 8080}

app.get("/", async (req, res) => {
    let mg = new mongo();
    await mg.connect();


    res.send("yo brat")
});

app.get("/user/:userid", (req, res)=>{
    // res.send(req.params.userid);
    //todo : if userid not in bdd alors rediriger vers la connexion
    res.redirect("/")
});

app.post("/signup", (req, res)=>{
    let transco = new Transcoder()
    res.send(transco.base64Decode(req.query.data))
});

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
})