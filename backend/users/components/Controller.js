const User = require("./User");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const {generateUserToken, generateRefreshToken, decodeToken} = require("../../middleware/TokenGeneration");
const roles = require("../../generic_components/rolePermissionManager");

function registerUser(req, res){
    if (req.body.id !== undefined){
        delete req.body.id;
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (Object.entries(req.body).length === 0){
        res.status(200).send(JSON.stringify({success:false, message:"No data given"}));
        return;
    }
    let usr = new User();
    usr.register(req.body, async (result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

async function updateUser(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let usr = new User();
    if (Object.entries(req.body).length === 0){
        res.status(200).send(JSON.stringify({success:false, message:"No data given"}));
        return;
    }
    let data = req.body;
    data.id = parseInt(req.query["id"]);
    await usr.update(data, (result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

async function logUser(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let usr = new User();
    if (Object.entries(req.body).length === 0){
        res.status(200).send(JSON.stringify({success:false, message:"No data given"}));
        return;
    }
    if (req.body.password === undefined || req.body.email===undefined){
        res.status(200).send(JSON.stringify({success:false, message:"Missing parameter"}));
        return;
    }
    await usr.connect(req.body.email, req.body.password, (result)=>{
        if (result.success !== undefined && result.success === false){
            delete result.id;
            delete result.password;
        } else {
            result.token = generateUserToken(result.id);
            result.refresh = generateRefreshToken(result.id);
        }
        delete result["password"];
        res.status(200).send(JSON.stringify(result));
    });
}

async function deleteUser(req, res) {
    let db = new SGBDRConnect();
    await db.Delete(req.query["id"], (result) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(JSON.stringify(result));
    });
}

async function changeUserEleveation(req, res){
    let usr = new User();
    await usr.changeElevation(req.query["id"], req.query["level"], (result)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(JSON.stringify(result));
    });
}

//###############################ACTIONS USER

async function getUser(req, res){
    let usr = new User();
    await usr.retrieve(req.query["id"], (result)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        delete result["password"];
        res.status(200).send(JSON.stringify(result));
    });
}

async function regenToken(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    const decoded = decodeToken(token);
    let usr = new User();
    await usr.retrieve(parseInt(req.query["id"]), (result)=>{
        if (result.id !== undefined){
            res.status(200).send(JSON.stringify({token:generateUserToken(decoded.userId)}));
        } else {
            res.status(404).send(JSON.stringify({token:false}));
        }
    });
}

async function confirmAccount(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let usr = new User();
    await usr.confirm(req.params["id"], (result)=>{
        res.status(200).send(JSON.stringify(result))
    });
}

async function getElevationLevelById(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), (result)=>{
        if (result.success===undefined){
            res.status(200).send(JSON.stringify({success:true, message:"ok", level:result.level, id:parseInt(req.query["id"])}))
        } else {
            res.status(404).send(JSON.stringify(result))
        }
    });
}

//PUBLIC ACTIONS

async function getUserList(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let db = new SGBDRConnect();
    await db.getUser(parseInt(req.query["id"]), async (result)=>{
        if (result.success===undefined){
            const rules = new roles(result.level).getPermissions("READ_CLIENT_ACCOUNT")
            if (rules.hasRole){
                await db.Read((result) => {
                    res.status(200).send(JSON.stringify(result));
                });
            } else {
                res.status(403).send(JSON.stringify({success:false, message:"Permission missing"}));
            }
        } else {
            res.status(404).send(JSON.stringify(result));
        }
    });
}

module.exports = {registerUser, updateUser, logUser, getUser, getUserList, deleteUser, changeUserEleveation, confirmAccount, regenToken, getElevationLevelById};
