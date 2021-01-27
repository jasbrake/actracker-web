import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'flag-icon-css/css/flag-icon.min.css'
import './styles/styles.scss'

Vue.use(Buefy, { defaultIconPack: 'fas' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
