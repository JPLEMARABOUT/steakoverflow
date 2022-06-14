const fs = require("fs")

function actionLogger(log) {
    fs.appendFileSync(`${process.cwd()}\\webservices.log`,`${getDateFormat()} : ${log}\n`, 'utf8');
}

function getDateFormat(){
    let d = new Date();
    return `${d.getFullYear()}-${
        (d.getMonth().toString().length===1? `0${d.getMonth()}` : d.getMonth())
    }-${
        (d.getDay().toString().length===1? `0${d.getDay()}` : d.getDay())
    } ${
        (d.getHours().toString().length===1? `0${d.getHours()}` : d.getHours())
    }:${
        (d.getMinutes().toString().length===1? `0${d.getMinutes()}` : d.getMinutes())
    }:${
        (d.getSeconds().toString().length===1? `0${d.getSeconds()}` : d.getSeconds())
    }`
}



module.exports = {actionLogger, cleanLogger};