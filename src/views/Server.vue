<template>
  <div class="home">
    <section class="section">
      <div class="container is-full">
        <span>
          <b-button icon-left="arrow-left" @click="$router.go(-1)">
            Back
          </b-button>
          <h1 class="title title-text is-inline">{{ server.description }}</h1>
          <hr>
          <h2 class="has-text-centered is-size-5">{{ mode }} <b>|</b> {{ server.game.map }} <b>|</b> {{ server.game.minutes_remaining }} minutes remaining <b>|</b> {{ server.key }}</h2>
        </span>
        <br>
        <div v-if="teamMode" class="columns is-desktop is-half-desktop is-centered">
          <div class="column">
            <GameStats :players="rvsfPlayers" :flagMode="flagMode"></GameStats>
          </div>
          <div class="column">
            <GameStats :players="claPlayers" :flagMode="flagMode"></GameStats>
          </div>
        </div>
        <div v-else class="columns is-half-desktop is-centered">
          <div class="column is-three-fifths">
            <GameStats :players="activePlayers" :flagMode="flagMode"></GameStats>
          </div>
        </div>
        <div v-if="specPlayers.length > 0" class="columns is-half-desktop is-centered">
          <div class="column is-three-fifths">
            <GameStats :players="specPlayers" :flagMode="flagMode"></GameStats>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getMode, teamMode, flagMode } from '@/utils/modes'
import GameStats from '@/components/GameStats'

export default {
  name: 'serverDetail',
  components: {
    GameStats
  },
  computed: {
    server () {
      return this.$store.getters.serverByKey(this.$route.params.id) || {}
    },
    mode () {
      return getMode(this.server.game.mode)
    },
    sortedPlayers () {
      return [...this.server.game.players].sort((a, b) => {
        if (this.flagMode && a.flags !== b.flags) {
          return b.flags - a.flags
        }
        return b.kills - a.kills
      })
    },
    activePlayers () {
      return this.sortedPlayers.filter(p => p.team !== 'SPECTATOR')
    },
    specPlayers () {
      return this.sortedPlayers.filter(p => p.team === 'SPECTATOR')
    },
    claPlayers () {
      return this.sortedPlayers.filter(p => p.team === 'CLA')
    },
    rvsfPlayers () {
      return this.sortedPlayers.filter(p => p.team === 'RVSF')
    },
    teamMode () {
      return teamMode(this.server.game.mode) || false
    },
    flagMode () {
      return flagMode(this.server.game.mode) || false
    }
  }
}
</script>

<style scoped>
/* td:hover {
  cursor: pointer;
} */
.title-text {
  margin-left: 1rem;
}
</style>
