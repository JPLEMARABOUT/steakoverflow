const axios = require('axios');
let address = "localhost"
const port = 5000;
if (process.env.environement==="docker"){
    address = "host.docker.internal";
}

class SGBDRConnect{

    async insertData(data, callback=undefined){
        try {
            let res = await axios.post(`http://${address}:${port}/insert_user?data=${data}`)
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

    async Update(data,callback=undefined){
        try {
            let res = await axios.post(`http://${address}:${port}/update_user?data=${data}`);
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

    async logUser(email, password,callback=undefined){
        try {
            let res = await axios.post(`http://${address}:${port}/match_user_and_retrieve?email=${email}&password=${password}`);
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

    async getUser(id,callback=undefined){
        try {
            let res = await axios.post(`http://${address}:${port}/get_user?id=${id}`);
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

    async Read(callback){
        try {
            let res = await axios.post(`http://${address}:${port}/list_user`);
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

    async Delete(id,callback){
        try {
            let res = await axios.post(`http://${address}:${port}/delete_user?id=${id}`);
            if (callback !== undefined){
                callback(res.data)
            }
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = SGBDRConnect;