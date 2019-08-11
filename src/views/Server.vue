<template>
  <div class="home">
    <section class="section">
      <div class="container is-full">
        <span>
          <b-button icon-left="arrow-left" @click="$router.go(-1)">
            Back
          </b-button>
          <h1 class="title title-text is-inline">{{ server.description }}</h1>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'serverDetail',
  computed: {
    server () {
      return this.$store.getters.serverByKey(this.$route.params.id) || {}
    }
  },
  methods: {
  },
  created () {
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>
td:hover {
  cursor: pointer;
}
.title-text {
  margin-left: 1rem;
}
</style>
