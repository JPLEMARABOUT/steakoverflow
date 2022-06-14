const express = require("express");
const app = express();
const auth = require("../middleware/middleware")
const Controller = require("./components/Controller");

const consts = {"port": 8080};

app.get("/clear", Controller.clearDB);

app.post("/register_resto",auth, Controller.registerRestaurant);

app.post("/get_resto_list", Controller.getRestaurantList);

app.post("/delete/:id", Controller.deleteRestaurant);

app.post("/update/:id", Controller.updateRestaurantInfos);

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
});