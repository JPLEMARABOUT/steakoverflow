const axios = require('axios');

class SGBDRConnect{

    async insertData(data, callback=undefined){
        try {
            let res = await axios.post(`http://localhost:5000/insert_user?data=${data}`)
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

    async Update(data, callback=undefined){
        try {
            let res = await axios.post(`http://localhost:5000/update_user?data=${data}`);
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

    async logUser(email, password, callback=undefined){
        try {
            let res = await axios.post(`http://localhost:5000/match_user_and_retrieve?email=${email}&password=${password}`);
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

    async getUser(id, callback=undefined){
        try {
            let res = await axios.post(`http://localhost:5000/get_user?id=${id}`);
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

    async Read(callback){
        try {
            let res = await axios.post(`http://localhost:5000/list_user`);
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

    async Delete(id,callback){
        try {
            let res = await axios.post(`http://localhost:5000/delete_user?id=${id}`);
            if (callback !==undefined){
                callback(res.data);
            }
        } catch (e){
            console.log(e)
        }
    }

}

module.exports = SGBDRConnect;