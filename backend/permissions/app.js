const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors())

const roles = require("../generic_components/rolePermissionManager");

const consts = {"port": 8082};

app.get("/list_permissions_by_role", (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(JSON.stringify({permissions:new roles(parseInt(req.query["role"])).getPermissionList()}))
});

app.get("/get_type_list", (req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const cats = ["FAST FOOD", "BURGER", "SUSHI", "THAI", "CHINESE", "TACOS", "KEBAB", "GRILL", "PIZZA", "GASTRONOMIQUE", "LIBANAIS", "TEX-MEX", "SPECIALITE_DU_MONDE"];
    res.status(200).send(JSON.stringify(cats))
})

app.listen(consts.port,"0.0.0.0", ()=>{
    console.log(`Server serving on port ${consts.port}`);
});
