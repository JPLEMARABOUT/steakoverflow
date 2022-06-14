const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env["USER_TOKEN_KEY"]);
        const userId = decodedToken.userId;
        if (req.query["id"] === undefined){
            res.status(403).send(JSON.stringify({success:false, message:"Id not specified"}))
            return
        }
        const id = parseInt(req.query["id"])
        if (id && id !== userId) {
            res.status(403).send(JSON.stringify({success:false, message:"Id mismatch"}))
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};