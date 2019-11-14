import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/Demo.vue'
import hklDate from "../views/HKL/hklDate"
import hklView from "../views/HKL/hklView"
import myText from '../views/HKL/text'
import hklBill from '../views/HKL/bill'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Demo',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/myText',
    name: 'text',
    component: myText
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
  },
  {
    path: '/hklBill',
    name: 'bill',
    component: hklBill
  }
]

const router = new VueRouter({
  routes
})

export default router
