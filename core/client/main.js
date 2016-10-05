import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Element from 'element-ui'

import App from './app'
import routes from './routes'

import 'normalize.css/normalize.css'
// import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/global.less'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)

const router = new VueRouter({
  // http://router.vuejs.org/en/api/options.html
  mode: 'history',
  base: '/',
  routes: [
    { name: 'dashboard', path: '/dashboard', component: require('./pages/dashboard') },
    { name: 'about', path: '/about', component: require('./pages/about') }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
