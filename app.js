const express = require("express");
const app = express();

const Controller = require("./components/Controller");

const consts = {"port": 8080};

app.post("/register_resto", Controller.registerRestaurant);

app.post("/get_resto_list", Controller.getRestaurantList);

app.post("/delete", Controller.deleteRestaurant);

app.post("/update", Controller.updateRestaurantInfos);

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
});