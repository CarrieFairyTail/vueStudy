import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/Demo.vue'
import hklDate from "../views/HKL/hklDate"
import hklView from "../views/HKL/hklView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Demo',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/hklDate',
    name: 'hklDate',
    component: hklDate
  },
  {
    path: '/hklView',
    name: 'hklView',
    component: hklView
  }
]

const router = new VueRouter({
  routes
})

export default router
