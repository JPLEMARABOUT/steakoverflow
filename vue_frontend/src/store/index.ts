import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import VueCookies from 'vue-cookies'

<<<<<<< HEAD
let address = 'localhost'
=======
let address = '10.169.130.111'
>>>>>>> frontend
if (process.env.environement === 'docker') {
  address = 'host.docker.internal'
}

Vue.use(Vuex)
Vue.use(VueCookies)
const instanceUsers = axios.create({
  baseURL: `http://${address}:8081`
})
const instanceRestaurants = axios.create({
  baseURL: `http://${address}:8080`
})
const instanceRecipes = axios.create({
  baseURL: `http://${address}:8083`
})
const instancePermissions = axios.create({
  baseURL: `http://${address}:8082`
})
const instanceOrders = axios.create({
  baseURL: `http://${address}:8084`
})
const instanceDeliveries = axios.create({
  baseURL: `http://${address}:8085`
})

export default new Vuex.Store({
  state: {
    status: '',
    user: ''
  },
  getters: {
  },
  mutations: {
    logUser: function (state, user) {
      state.user = user
    }

  },
  actions: {
<<<<<<< HEAD
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
=======
>>>>>>> frontend
    createAccount: ({ commit }, userInfos) => {
      instanceUsers.post('/register', userInfos)
        .then(function (response) {
          if (response.data.success) {
            window.location.href = '/login'
            alert('Inscription réussie !')
          } else {
            alert('Inscription impossible')
          }
        }
        )
        .catch(function (error) {
          console.log(error.config)
        })
    },
    loginAccount: ({ commit }, userInfos) => {
      instanceUsers.post('/login', userInfos)
        .then(function (response) {
          if (typeof response.data.level !== 'undefined') {
            commit('logUser', response.data)
            router.push('/home')
          } else {
            alert('Connexion impossible. Adresse et/ou mot de passe invalide.')
          }
        }
        )
        .catch(function (error) {
          console.log(error.config)
        })
<<<<<<< HEAD
=======
    },
    GetListRecipe: (state, RestaurantsInfos) => {
      const constraint = { restaurant_id: RestaurantsInfos }
      instanceRecipes.get(`/list_recipes?constraint=${JSON.stringify(constraint)}`)
        .then(function (response) {
          console.log(state)
          return state
        }
        )
        .catch(function (error) {
          console.log(error.config)
        })
    },
    GetRestaurants: (state, RestaurantsInfos) => {
      const constraint = { patron: RestaurantsInfos }
      instanceRestaurants.get(`/get_resto_list?constraint=${JSON.stringify(constraint)}`)
        .then(function (response) {
          console.log(state)
          return state
        }
        )
        .catch(function (error) {
          console.log(error.config)
        })
>>>>>>> frontend
    }
  },
  modules: {
  }
})
