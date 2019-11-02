import Vue from 'vue'
import VueRouter from 'vue-router'
// import Demo from '../views/Demo.vue'
import Calendar from '../views/q/calendar.vue'

Vue.use(VueRouter)

const routes = [
    /*{
        path: '/',
        name: 'Demo',
        component: Demo
    },*/
    {
        path: '/',
        name: 'Calendar',
        component: Calendar
    }
]

const router = new VueRouter({
  routes
})

export default router
