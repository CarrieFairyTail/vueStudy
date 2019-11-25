import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '../src/plugins/style/reset.styl'
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/plugins/element-#09315B/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
