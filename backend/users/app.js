const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors())
const auth = require("../middleware/middleware");

const Controller = require("./components/Controller");

const consts = {"port": 8081};

app.post("/register", Controller.registerUser);

app.put('/update',auth, Controller.updateUser);

app.post("/login", Controller.logUser);

app.get("/getuser", auth, Controller.getUser);

app.get("/getuserlist",auth, Controller.getUserList);

app.delete("/delete", auth, Controller.deleteUser);

app.put("/change_user_elev", auth,Controller.changeUserEleveation);

app.get("/confirm_account/:id", Controller.confirmAccount);

app.post("/regen_token", Controller.regenToken);

app.get("/get_level",auth, Controller.getElevationLevelById);

app.listen(consts.port,"0.0.0.0", ()=>{
    console.log(`Server serving on port ${consts.port}`);
});