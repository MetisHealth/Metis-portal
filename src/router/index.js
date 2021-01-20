import Vue from 'vue'
import Calendar from '../views/Calendar.vue'
import Patients from '../views/Patients.vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
