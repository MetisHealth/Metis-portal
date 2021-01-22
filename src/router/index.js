import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: 'calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    props: true
  },
  {
    path: 'patients',
    name: 'Patients',
    component: () => import('../views/Patients.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
