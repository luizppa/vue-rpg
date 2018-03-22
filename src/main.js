import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'

Vue.config.productionTip = false

export const actions = new Vue({})

export const master = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
