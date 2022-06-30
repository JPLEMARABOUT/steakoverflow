const express = require("express");
const app = express();
const Controller = require("./components/Controller");
const auth = require("../middleware/middleware");
const cors = require('cors');
app.use(cors());

const consts = {port:8084}

app.post("/create_order", auth,Controller.createOrder);

app.get("/list_order", Controller.listOrders);

app.put("/update_order", auth,Controller.updateOrder);

app.delete("/delete_order", auth,Controller.deleteOrder);

app.post("/pay", auth, Controller.pay);

app.post("/validate", auth, Controller.validate);

app.get("/order_history/:type", auth, Controller.getOrderHistoryUser, Controller.getOrderHistoryRest);

app.get("/get_stats", auth, Controller.generateStats)

app.listen(consts.port,"0.0.0.0", ()=>{
    console.log(`Server serving on port ${consts.port}`);
});