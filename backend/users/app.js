const express = require("express");
const app = express();
const auth = require("../middleware/middleware");

const Controller = require("./components/Controller");

const consts = {"port": 8081};

app.post("/register", Controller.registerUser);

app.post('/update',auth, Controller.updateUser);

app.post("/login", Controller.logUser);

app.post("/getuser", auth, Controller.getUser);

app.post("/getuserlist", Controller.getUserList);

app.post("/delete", auth, Controller.deleteUser);

app.post("/change_user_elev", auth,Controller.changeUserEleveation);

app.get("/confirm_account/:id", Controller.confirmAccount);

app.post("/regen_token", Controller.regenToken);

app.post("/get_level",auth, Controller.getElevationLevelById)

app.listen(consts.port, ()=>{
    console.log(`Server serving on port ${consts.port}`);
});