import Vue from 'vue'
import App from './App.vue'
import './plugins'
import vuetify from '@/plugins/vuetify'
import router from './router'
import axios from './plugins/axios'

Vue.config.productionTip = false

new Vue({
  axios,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
