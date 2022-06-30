const express = require("express");
const app = express();
const auth = require("../middleware/middleware")
const Controller = require("./components/Controller");
const cors = require('cors');
app.use(cors());

const consts = {"port": 8080};

app.post("/register_resto",auth, Controller.registerRestaurant);

app.get("/get_resto_list", Controller.getRestaurantList);

app.delete("/delete/:id",auth, Controller.deleteRestaurant);

app.put("/update/:id",auth, Controller.updateRestaurantInfos);

app.listen(consts.port,"0.0.0.0", ()=>{
    console.log(`Server serving on port ${consts.port}`);
});