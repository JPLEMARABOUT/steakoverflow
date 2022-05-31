const crypto = require("crypto");

class Transcoder{


    sha256cyph(content){
        return crypto.createHash('sha256').update(content).digest('base64')
    }

    base64Encode(content){
        return new Buffer.from(content, "utf-8").toString('base64');
    }

    base64Decode(content){
        return new Buffer.from(content, 'base64').toString('utf-8');
    }
}

module.exports = Transcoder;