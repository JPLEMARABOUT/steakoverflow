const express = require("express");
const app = express()

const consts = {"port": 8080}

app.get("/", (req, res)=>{
    res.send("yo brat")
});

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
})