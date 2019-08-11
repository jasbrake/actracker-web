import Vue from 'vue'
import Router from 'vue-router'
import Servers from './views/Servers.vue'
import Server from './views/Server.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Servers
    },
    {
      path: '/server/:id',
      name: 'server',
      component: Server
    }
  ]
})
