import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
<<<<<<< HEAD
=======
// import cookie from './plugins/cookie'
>>>>>>> frontend

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
<<<<<<< HEAD
=======
  // cookie,
>>>>>>> frontend
  render: h => h(App)
}).$mount('#app')
