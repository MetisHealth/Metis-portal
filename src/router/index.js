import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    props: true
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('../views/Patients.vue')
  },
  {
    path: '/disabled',
    name: 'Disabled',
    component: () => import('../views/Disabled.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/oauth/zoom',
    name: 'ZoomOauth',
    component: () => import('../views/ZoomOauth.vue')
  },
  {path: '/', redirect: '/calendar'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
