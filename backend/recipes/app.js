const express = require("express");
const app = express();
const auth = require("../middleware/middleware")
const Controller = require("./components/Controller");
const cors = require('cors');
app.use(cors())

const consts = {"port": 8083};

app.post("/create_recipe",auth, Controller.createRecipe);

app.get("/list_recipes", Controller.list_recipes);

app.get("/list_recipes_multiple", Controller.getMultiple)

app.delete("/delete_recipe",auth, Controller.delete_recipes);

app.put("/update_recipe",auth, Controller.update_recipe);

app.post("/create_menu", auth, Controller.compose_menu);

app.get("/read_menu", Controller.read_menu);

app.put("/update_menu", auth, Controller.update_menu);

app.delete("/delete_menu", auth, Controller.delete_menu);

app.listen(consts.port,"0.0.0.0", ()=>{
    console.log(`Server serving on port ${consts.port}`);
});