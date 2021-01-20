<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
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
    }
  },
  created () {
    this.startFetchingServers()
  },
  beforeDestroy () {
    clearInterval(this.fetchTimer)
  }
}
</script>
