// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Yolo from './yolo/lib'
import VueCarousel from './components/vue-carousel'
import './components'
import router from './router'
import store from './store'
import './plugin'

Vue.use(VueCarousel)
Vue.use(Yolo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
