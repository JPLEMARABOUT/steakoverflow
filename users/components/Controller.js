const User = require("./User");
const SGBDRConnect = require("../../generic_components/SGBDRConnect");
const {generateUserToken, generateRefreshToken, decodeToken} = require("../middleware/TokenGeneration");
const axios = require("axios");

function registerUser(req, res){
    let usr = new User();
    usr.register(JSON.parse(req.query["data"]), async (result)=>{
        console.log(result.id) //todo : send mail of confirm
        let mailer = await axios.post(`http://localhost:5000/insert_user?message=${"aaaa"}&dest=${"bbbbb"}`);
        if (mailer["success"]!==true){
            let db = new SGBDRConnect();
            await db.Delete(result.id);
            res.status(500).send(mailer);
        }
        if (result.id !== undefined){
            delete result.id;
        }
        res.status(200).send(JSON.stringify(result));
    });
}

async function logUser(req, res){
    let usr = new User();
    await usr.connect(req.query["email"], req.query["pass"], (result)=>{
        if (result.success !== undefined && result.success === false){
            delete result.id;
            delete result.password;
        } else {
            result.token = generateUserToken(result.id);
            result.refresh = generateRefreshToken(result.id);
        }
        res.status(200).send(JSON.stringify(result));
    });
}

async function getUser(req, res){
    let usr = new User();
    await usr.retrieve(req.query["id"], (result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

function updateUser(req, res){
    let usr = new User();
    usr.update(JSON.parse(req.query["data"]), (result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

async function deleteUser(req, res){
    let db = new SGBDRConnect();
    await db.Delete(req.query["id"],(result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

async function changeUserEleveation(req, res){
    let usr = new User();
    await usr.changeElevation(req.query["id"], req.query["level"], (result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

async function regenToken(req, res){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    const decoded = decodeToken(token);
    let usr = new User();
    await usr.retrieve(req.query["id"], (result)=>{
        if (result.id !== undefined){
            res.status(200).send(JSON.stringify({token:generateUserToken(decoded.userId)}));
        } else {
            res.status(404).send(JSON.stringify({token:false}));
        }
    });
}

async function confirmAccount(req, res){
    let usr = new User();
    await usr.confirm(req.query["id"], (result)=>{
        res.status(200).send(JSON.stringify(result))
    });
}

//PUBLIC ACTIONS

async function getUserList(req, res){
    let db = new SGBDRConnect();
    await db.Read((result)=>{
        res.status(200).send(JSON.stringify(result));
    });
}

module.exports = {registerUser, updateUser, logUser, getUser, getUserList, deleteUser, changeUserEleveation, confirmAccount, regenToken};