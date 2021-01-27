import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";

axios.defaults.baseURL = 'https://api.metisapp.net'

const options = {
};

Vue.use(Toast, options);

//Devtools variables
Vue.config.performance = process.env.NODE_ENV !== 'travis'
Vue.config.development = process.env.NODE_ENV !== 'travis'
Vue.config.productionTip = process.env.NODE_ENV !== 'travis'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
