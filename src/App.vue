<template>
  <div id="app">
    <Navbar ref="navbar" />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },

  methods: {
    startFetchingServers: function () {
      this.$store.dispatch('updateServers')
      this.fetchTimer = setInterval(() => this.$store.dispatch('updateServers'), 5000)
    },

    stopFetchingServers: function () {
      clearInterval(this.fetchTimer)
    },

    focusSearch () {
      this.$nextTick(() => this.$refs.navbar.$refs.playerSearch.focus())
    }
  },

  created () {
    const { focusSearch } = this
    window.addEventListener('keydown', function (event) {
      if (event.code === 'Slash') {
        event.preventDefault()
        focusSearch()
      }
    })

    this.startFetchingServers()
  },
  beforeDestroy () {
    clearInterval(this.fetchTimer)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

.monospace {
  font-family: 'Inconsolata', monospace;
}
</style>
