<template>
  <section class="section">
    <div class="container is-full">
      <h1 class="title is-1">{{ name }}</h1>

      <div class="box">
        <h3 class="title is-3">Past Games</h3>
        <div v-for="pg in playerGames" :key="`${pg.ip}-${pg.game_id}`">
          <p>{{ pg.game_id }}</p>
        </div>
        <b-message type="is-warning" :active="showWarning" size="is-medium" icon-size="is-medium" has-icon>
          No past games found
        </b-message>
      </div>

      <b-message type="is-danger" :active="showError" size="is-medium" icon-size="is-medium" has-icon>
        Error loading player
      </b-message>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Player',

  data: () => ({
    playerGames: [],
    isFetchingPlayer: true,
    showError: false
  }),

  computed: {
    name: ({ $route }) => $route.params.name,
    showWarning: ({ playerGames, isFetchingPlayer, showError }) => playerGames.length === 0 && !isFetchingPlayer && !showError
  },

  methods: {
    async fetchPlayer () {
      const name = this.name
      if (!name || !name.length) {
        this.player = null
        return
      }

      this.isFetchingPlayer = true
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/player?` + new URLSearchParams({
          name
        }))

        console.log(res)

        if (!res.ok) {
          throw new Error(`fetchPlayer error: ${res.status}`)
        }

        const playerGames = await res.json()
        if (playerGames && playerGames.length > 0) {
          this.playerGames = playerGames
        }
      } catch (e) {
        this.playerGames = []
        this.showError = true
        throw e
      } finally {
        this.isFetchingPlayer = false
      }
    }
  },

  async mounted () {
    await this.fetchPlayer()
  }
}
</script>

<style scoped>
</style>
