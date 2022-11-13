import Vue from 'vue'
import './plugins/axios'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as echarts from 'echarts'
import '@/icons'
import VueSmoothScroll from "vue2-smooth-scroll";
Vue.use(VueSmoothScroll)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
