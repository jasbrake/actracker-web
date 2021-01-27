<template>
  <div class="home">
    <section class="section">
      <div class="container is-full">
        <div v-if="server">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h1 class="title is-2">{{ server.description }}</h1>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <b-field>
                  <b-tag type="is-success" class="title is-4 monospace">{{ server.ip }} {{ server.port }}</b-tag>
                </b-field>
<!--                <p class="title is-4 box is-family-code">{{ server.ip }} {{ server.port }}</p>-->
              </div>
            </div>
          </div>

          <div class="level box">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Mode</p>
                <p class="title is-4">{{ mode }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Map</p>
                <p class="title is-4">{{ server.game.map }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Minutes Remaining</p>
                <p class="title is-4">{{ server.game.minutes_remaining }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Players</p>
                <p class="title is-4">{{ server.game.player_count }}/{{ server.max_clients }}</p>
              </div>
            </div>
          </div>

          <div>
            <div v-if="teamMode" class="columns is-desktop is-half-desktop is-centered">
              <div class="column is-full-touch">
                <ServerPlayerTable :players="rvsfPlayers" :flagMode="flagMode" :teamMode="teamMode" teamName="RVSF" class="rvsf"></ServerPlayerTable>
              </div>
              <div class="column is-full-touch">
                <ServerPlayerTable :players="claPlayers" :flagMode="flagMode" :teamMode="teamMode" teamName="CLA" class="cla"></ServerPlayerTable>
              </div>
            </div>
            <div v-else class="columns is-half-widescreen is-centered">
              <div class="column is-three-fifths">
                <ServerPlayerTable :players="activePlayers" :flagMode="flagMode" :teamMode="teamMode" teamName="All Players" class="normal"></ServerPlayerTable>
              </div>
            </div>
            <div v-if="specPlayers.length > 0" class="columns is-half-desktop is-centered">
              <div class="column is-three-fifths">
                <ServerPlayerTable :players="specPlayers" :flagMode="flagMode" :teamMode="teamMode" teamName="Spectators" class="normal"></ServerPlayerTable>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="title has-text-centered">Server has no current game!</div>
      </div>
    </section>
  </div>
</template>

<script>
import { getMode, teamMode, flagMode } from '@/utils/modes'
import ServerPlayerTable from '@/components/ServerPlayerTable'

export default {
  name: 'Server',

  components: {
    ServerPlayerTable
  },

  computed: {
    server () {
      return this.$store.getters.serverByKey(this.$route.params.id)
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

    activePlayers: ({ sortedPlayers }) => sortedPlayers.filter(p => p.team !== 'SPECTATOR'),
    specPlayers: ({ sortedPlayers }) => sortedPlayers.filter(p => p.team === 'SPECTATOR'),
    claPlayers: ({ sortedPlayers }) => sortedPlayers.filter(p => p.team === 'CLA'),
    rvsfPlayers: ({ sortedPlayers }) => sortedPlayers.filter(p => p.team === 'RVSF'),

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
.server-connect {
  font-size: 2em;
}
</style>
