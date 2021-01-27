<template>
  <b-navbar centered class="is-black">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        AC Tracker
      </b-navbar-item>
    </template>

    <template #start class="level">
      <b-field class="level-item">
        <b-autocomplete :data="players"
                        ref="playerSearch"
                        v-model="player"
                        placeholder="Find player"
                        icon-right="search"
                        icon-right-clickable
                        @icon-right-click="gotoPlayer(player)"
                        icon-pack="fas"
                        :loading="isFetchingPlayers"
                        @typing="fetchPlayers"
                        @select="p => gotoPlayer(p)"
                        @keydown.native.enter="gotoPlayer(player)"
        >
          <template slot-scope="props">
            <div>
              {{ props.option }}
            </div>
          </template>
          <template #empty>No players found</template>
        </b-autocomplete>
      </b-field>
    </template>

    <template #end>
      <b-navbar-item tag="a" href="https://github.com/jasbrake/actracker">
        <b-icon pack="fab" icon="github" size="is-large" />
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'navbar',
  data: () => ({
    players: [],
    player: null,
    selected: null,
    isFetchingPlayers: false
  }),

  methods: {
    fetchPlayers: debounce(async function (name) {
      if (!name || !name.length) {
        this.players = []
        return
      }

      this.isFetchingPlayers = true
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/player_autocomplete?` + new URLSearchParams({
          q: name
        }))

        if (!res.ok) {
          throw new Error(`fetchPlayers error: ${res.status}`)
        }

        const players = await res.json()
        this.players = []
        if (players) {
          players.forEach(p => this.players.push(p))
        }
      } catch (e) {
        this.players = []
        throw e
      } finally {
        this.isFetchingPlayers = false
      }
    }, 500),

    gotoPlayer (name) {
      if (name && this.$route.params.name !== name) {
        this.$router.push({ name: 'player', params: { name } })
      }
    }
  }
}
</script>
