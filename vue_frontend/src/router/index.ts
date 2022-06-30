import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Legal from '../views/LegalNotices.vue'
import ManageArticles from '../views/ManageArticles.vue'
import ManageMenu from '../views/ManageMenu.vue'
import AccountSettings from '../views/Settings.vue'
import DeliveryStep from '../views/Delivery.vue'
import LoginForm from '../components/Forms/LoginForm.vue'
import RegistrationForm from '../components/Forms/RegistrationForm.vue'
import NotFound from '../components/NotFound.vue'
import DeliveryHistoric from '../views/Historic.vue'
import testVue from '../components/testVue.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/delivery',
    name: 'DeliveryStep',
    component: DeliveryStep
  },
  {
    path: '/menu',
    name: 'ManageMenu',
    component: ManageMenu
  },
  {
    path: '/historic',
    name: 'DeliveryHistoric',
    component: DeliveryHistoric
  },
  {
    path: '/settings',
    name: 'AccountSettings',
    component: AccountSettings
  },
  {
    path: '/legal',
    name: 'Legal',
    component: Legal
  },
  {
    path: '/articles',
    name: 'ManageArticles',
    component: ManageArticles
  },
  {
    path: '/test',
    name: 'testVue',
    component: testVue
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationForm
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
