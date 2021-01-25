import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/index.css'
import axios from "axios";

const axiosConfig = {
  baseUrl: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000
}

Vue.prototype.$axios = axios.create(axiosConfig)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
