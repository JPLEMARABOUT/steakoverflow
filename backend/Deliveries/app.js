const express = require("express");
const app = express();
const Controller = require("./components/Controller");
const auth = require("../middleware/middleware");
const cors = require('cors');
app.use(cors())

const consts = {port:8085}

app.post("/create_delivery", auth, Controller.createDelivery);

app.get("/get_deliveries", Controller.getDelivery);

app.put("/update_delivery",auth, Controller.updateDelivery);

app.delete("/delete_delivery", auth, Controller.deleteDelivery);

app.get("/get_requested_delivery", auth, Controller.getRequestedDeliveriies);

app.post("/create_delivery_request", auth, Controller.createDeliveryRequest);

app.listen(consts.port, "0.0.0.0",()=>{
    console.log(`Server serving on 0.0.0.0:${consts.port}`);
});