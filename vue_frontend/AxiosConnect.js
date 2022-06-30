const axios = require("axios");

let address = "localhost"
let currentEnv = "local";
if (process.env.environement==="docker"){
    currentEnv = "docker"
    address = "host.docker.internal";
}

const ports = {users:{docker:"49165", local:"8081"}, restaurants:{docker:"49164", local:"8080"}, recipes:{docker:"49163", local:"8083"},
permissions:{docker:"49162", local:"8082"}, orders:{docker:"49161", local:"8084"}, deliveries:{docker:"49160", local:"8085"}}


const baseurl_tot = `http://${address}:PORT`;
let baseurl = ""

class ApiConnect{

    bearer;
    header

    constructor(){
        this.bearer = undefined;
    }

    setHost(host = undefined){
        if (host !== undefined){
            address = host;
        }
    }

    /**
     * Permet de set le bearer pour effectuer des actions authentifiées sur le back
     * @param bearer le token
     */
    setBearer(bearer){
        this.bearer = bearer;
        this.header = {headers:{ Authorization: `Bearer ${bearer}`}};
    }

    /**
     * Fonction qui permet de créer un nouveau resturant
     * @param user_id Id de l'utilisateur
     * @param data JSON contenant : name, address, commune, patron_id, "BURGER", url Image
     */
    async createRestaurant(user_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0};
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.restaurants[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/register_resto?data=${JSON.stringify(data)}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * Fonction qui permet de récupérer la liste des contraintes
     * @param constraint un json contenant la clef et la variable recherchée
     */
    async getRestaurantList(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.restaurants[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_resto_list?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * Fonction qui permet de modifier un restaurant
     * @param user_id Id du patron du restaurant
     * @param restaurant_id Id du restaurant
     * @param changes clef de la variable a changer avec sa valeur
     */
    async updateRestaurant(user_id, restaurant_id, changes){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.restaurants[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update/${restaurant_id}?id=${user_id}&changes=${JSON.stringify(changes)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * Fonction qui permet de supprimer un restaurant
     * @param user_id Id du patron du restaurant
     * @param restaurant_id Id du restaurant
     */
    async deleteRestaurant(user_id, restaurant_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.restaurants[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete/${restaurant_id}?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    //######################################## RECIPES

    /**
     * Fonction pour créer une recette
     * @param user_id l'id de l'user qui crée la recette
     * @param data les données de la recette
     */
    async createRecipe(user_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/create_recipe?id=${user_id}&data=${JSON.stringify(data)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * La fonction pour récupérer toutes les recettes
     * @param constraint contraintes comme celle de mongoDb
     * @returns {Promise<void>}
     */
    async getRecipes(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/list_recipes?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * Fonction pour récupérer les recettes avec plusieurs ID
     * @param constraint
     * @returns {Promise<void>}
     */
    async getRecipesMultiple(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/list_recipes_multiple?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async updateRecipe(user_id, recipe_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update_recipe?id=${user_id}&recipe=${recipe_id}&data=${JSON.stringify(data)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async deleteRecipe(user_id, recipe_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete_recipe?id=${user_id}&recipe=${recipe_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    //##################################### MENU

    async createMenu(user_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/create_menu?data=${JSON.stringify(data)}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getMenu(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/read_menu?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async updateMenu(user_id,menu_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update_menu?id=${user_id}&data=${JSON.stringify(data)}&menu=${menu_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async deleteMenu(user_id, menu_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.recipes[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete_menu?id=${user_id}&menu=${menu_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }


    //###################################PERMISSIONS

    async getPermissionByRole(role){
        baseurl = ApiConnect.#getNewbaseUrl(ports.permissions[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/list_permissions_by_role?role=${role}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getTypeList(callback){
        baseurl = ApiConnect.#getNewbaseUrl(ports.permissions[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_type_list`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    //#####################################ORDERS

    async createOrder(user_id,data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/create_order?data=${JSON.stringify(data)}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getOrder(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/list_order?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async updateOrder(user_id, order_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update_order?id=${user_id}&data=${JSON.stringify(data)}&order=${order_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async deleteOrder(user_id, order_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete_order?id=${user_id}&order=${order_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async validateOrder(user_id, order_id, restaurant_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/validate?order=${order_id}&restaurant=${restaurant_id}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async payOrder(user_id, order_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/pay?id=${user_id}&order=${order_id}&data=${JSON.stringify(data)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    /**
     * Fonction qui renvoie l'historique des ocmmandes en fonction du type
     * @param type restaurant | user
     * @param id l'id du restaurant ou du user selon l'api sollicitée
     */
    async orderHistory(type, id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0};
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/order_history/${type}?id=${id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getStats(user_id, restaurant_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.orders[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_stats?id=${user_id}&restaurant=${restaurant_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    //###############################DELIVERIES

    async createDelivery(user_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/create_delivery?data=${JSON.stringify(data)}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getDelivery(constraint){
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_deliveries?constraint=${JSON.stringify(constraint)}`);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async updateDelivery(user_id, delivery_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update_delivery?data=${JSON.stringify(data)}&id=${user_id}&delivery=${delivery_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async deleteDelivery(user_id, delivery_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete_delivery?delivery=${delivery_id}&id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getRequestedDeliery(user_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_requested_delivery?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async createDeliveryRequest(user_id, data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.deliveries[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/create_delivery_request?id=${user_id}&data=${JSON.stringify(data)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    //################################ USERS

    async createUser(data){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/register?data=${JSON.stringify(data)}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async updateUser(user_id, data){
        if (this.bearer === undefined){
                        return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/update?data=${JSON.stringify(data)}&id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async login(email, password){
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/login?email=${email}&pass=${password}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getUser(user_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/getuser?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getUserList(user_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/getuserlist?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async deleteUser(user_id){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.delete(`${baseurl}/delete?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async changeUserElevation(user_id, new_level){
        if (this.bearer === undefined){
            return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.put(`${baseurl}/change_user_elev?id=${user_id}&level=${new_level}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async regenToken(user_id){
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.post(`${baseurl}/regen_token?id=${user_id}`, {}, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    async getUserLevel(user_id){
        if (this.bearer === undefined){
                        return {success:false, message:"Token Missing", err_code:0}
        }
        baseurl = ApiConnect.#getNewbaseUrl(ports.users[currentEnv]);
        try {
            let res = await axios.get(`${baseurl}/get_level?id=${user_id}`, this.header);
            return res.data
        } catch (e){
            console.log(e)
        }
    }

    static #getNewbaseUrl(port){
        return baseurl_tot.replaceAll("PORT", port);
    }

}

module.exports = new ApiConnect();
