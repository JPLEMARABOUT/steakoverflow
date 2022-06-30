const jwt = require('jsonwebtoken');
const SGBDRConnect = require("../generic_components/SGBDRConnect");
require('dotenv').config();

module.exports = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        if (req.headers.authorization === undefined){
            res.status(200).send(JSON.stringify({success:false, message:"No Token"}));
            return
        }
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env["USER_TOKEN_KEY"],{}, async (err, decodedToken)=>{
            if (err){
                res.status(200).send(JSON.stringify({success:false, message:"Expired Token"}));
                return;
            }
            const userId = decodedToken.userId;
            if (req.query["id"] === undefined){
                res.status(403).send(JSON.stringify({success:false, message:"Id not specified"}))
                return
            }
            let db = new SGBDRConnect();
            await db.getUser(parseInt(req.query["id"]), async (result)=>{
                if (result.success===undefined){
                    const id = parseInt(req.query["id"])
                    if (id && id !== userId) {
                        res.status(403).send(JSON.stringify({success:false, message:"Id mismatch"}))
                    } else {
                        next();
                    }
                } else {
                    res.status(404).send(JSON.stringify(result));
                }
            });
        });
    } catch (error) {
        res.status(401).json({ error });
    }
};