import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    servers: [],
    update: true,
    couldFetchServers: true
  },
  getters: {
    sortedServers: state => {
      return state.servers.sort((a, b) => b.game.player_count - a.game.player_count)
    },
    serverCount: state => {
      return state.servers.length
    },
    serverByKey: state => key => {
      return state.servers.find(s => s.key === key)
    },
    couldFetchServers: state => {
      return state.couldFetchServers
    }
  },
  mutations: {
    updateServers (state, servers) {
      state.servers = servers
    },
    updateCouldFetchServers (state, couldFetch) {
      state.couldFetchServers = couldFetch
    }
  },
  actions: {
    async updateServers ({ commit, state }) {
      if (state.update) {
        let servers = await api.fetchServers()
        if (servers == null) {
          commit('updateServers', [])
          commit('updateCouldFetchServers', false)
        } else {
          commit('updateServers', servers)
          commit('updateCouldFetchServers', true)
        }
      }
    }
  }
})
