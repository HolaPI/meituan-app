import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

//routes-files importation
import Goods from './components/goods/Goods'
import Ratings from './components/ratings/Ratings'
import Seller from './components/seller/Seller'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
