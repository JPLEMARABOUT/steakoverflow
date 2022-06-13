const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateUserToken(userId){
    return jwt.sign(
        {
            userId: userId
        },
        process.env["USER_TOKEN_KEY"],
        {
            expiresIn: '1h'
        });
}

function generateRefreshToken(userId){
    return jwt.sign(
        {
        userId:userId
        },
        process.env["REFRESH_TOKEN_KEY"],
        {
            expiresIn: '1y'
        });
}

function decodeToken(token){
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}



module.exports = {generateUserToken, generateRefreshToken, decodeToken}