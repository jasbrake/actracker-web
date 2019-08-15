<template>
  <div class="home">
    <section class="section">
      <div class="container is-full">
        <h1 class="title">Servers</h1>
        <div class="columns is-full is-centered">
          <div class="column">
            <table class="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th class="has-text-centered"><b-tooltip label="Location" type="is-dark"><b-icon icon="globe-americas"></b-icon></b-tooltip></th>
                  <th><b-tooltip label="Description" type="is-dark"><b-icon icon="align-justify"></b-icon></b-tooltip></th>
                  <th class="has-text-centered"><b-tooltip label="Players" type="is-dark"><b-icon icon="users"></b-icon></b-tooltip></th>
                  <th class="is-hidden-mobile has-text-centered"><b-tooltip label="Mode" type="is-dark"><b-icon icon="gamepad"></b-icon></b-tooltip></th>
                  <th class="is-hidden-mobile"><b-tooltip label="Map" type="is-dark"><b-icon icon="map-marked-alt"></b-icon></b-tooltip></th>
                  <th class="is-hidden-mobile has-text-centered"><b-tooltip label="Time Remaining" type="is-dark"><b-icon icon="hourglass"></b-icon></b-tooltip></th>
                  <th class="is-hidden-mobile"><b-tooltip label="Address" type="is-dark"><b-icon icon="at"></b-icon></b-tooltip></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="server in sortedServers" :key="server.key" @click="serverClicked(server.key)">
                  <td class="has-text-centered"><b-tooltip :label="server.country" type="is-dark"><span :class="['flag-icon', 'flag-icon-' + server.country_iso.toLowerCase()]"></span></b-tooltip></td>
                  <td><b>{{ server.description }}</b></td>
                  <td class="has-text-centered"><span class="tag is-medium is-info">{{ server.game.player_count }}/{{ server.max_clients }}</span></td>
                  <td class="is-hidden-mobile has-text-centered">{{ mode(server.game.mode) }}</td>
                  <td class="is-hidden-mobile">{{ server.game.map }}</td>
                  <td class="is-hidden-mobile has-text-centered"><span class="tag is-medium">{{ server.game.minutes_remaining }}</span></td>
                  <td class="is-hidden-mobile">
                    <span class="tags has-addons">
                      <span class="tag is-success is-medium">{{ server.ip }} {{ server.port }}</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <b-message type="is-danger" :active="!couldFetchServers" size="is-medium" icon-size="is-medium" has-icon>
              Could not load servers
            </b-message>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMode } from '@/utils/modes'

export default {
  name: 'servers',
  data: function () {
    return {
      servers: [],
      fetchTimer: 0
    }
  },
  computed: {
    ...mapGetters([
      'sortedServers',
      'serverCount',
      'couldFetchServers'
    ])
  },
  methods: {
    serverClicked: function (key) {
      this.$router.push(`server/${key}`)
    },
    startFetchingServers: function () {
      this.$store.dispatch('updateServers')
      this.fetchTimer = setInterval(() => this.$store.dispatch('updateServers'), 5000)
    },
    stopFetchingServers: function () {
      clearInterval(this.fetchTimer)
    },
    mode: function (n) {
      return getMode(n)
    }
  }
}
</script>

<style scoped>
td:hover {
  cursor: pointer;
}
</style>
