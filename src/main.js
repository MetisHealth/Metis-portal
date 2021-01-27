import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";

axios.defaults.baseURL = 'https://api.metisapp.net'

Vue.use(Toast, {});

//Devtools variables
Vue.config.performance = process.env.NODE_ENV === 'development'
Vue.config.development = process.env.NODE_ENV === 'development'
Vue.config.productionTip = process.env.NODE_ENV !== 'development'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
