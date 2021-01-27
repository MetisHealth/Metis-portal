import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

const options = {
};

Vue.use(Toast, options);

//Production variables
//Vue.config.productionTip = false
//Vue.config.devtools = true
//Vue.config.performance = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
