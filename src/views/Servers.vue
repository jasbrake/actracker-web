<template>
  <div class="home">
    <section class="section">
      <div class="container is-full">
        <h1 class="title">Servers</h1>
        <div class="columns is-full is-centered">
          <div class="column">
            <table class="table is-hoverable is-fullwidth">
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
                  <td class="is-hidden-mobile has-text-centered">{{ server.game.mode }}</td>
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
          </div>
        </div>
        <!-- <:data="servers" striped hoverable>
          <template slot-scope="props" slot="header">
            {{ props.column.label }}
          </template>
          <template slot-scope="props">
            <b-table-column field="description" label="Description">
              {{ props.row.description }}
            </b-table-column>
            <b-table-column field="players" label="Players" width="1" centered>
              <span class="tag is-info is-medium">{{ props.row.player_count }}/{{ props.row.max_clients }}</span>
            </b-table-column>
            <b-table-column field="mode" label="Mode" width="1" centered>
              {{ /*props.row.mode*/"CTF" }}
            </b-table-column>
            <b-table-column field="map" label="Map" width="1" centered>
              {{ props.row.current_map }}
            </b-table-column>
            <b-table-column field="time_left" label="Remaining" width="1" centered>
              {{ props.row.minutes_remaining }} minutes
            </b-table-column>
          </template>
        </b-table> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'servers',
  data: function () {
    return {
      servers: [],
      fetchTimer: 0
    }
  },
  computed: {
    serverCount: function () {
      return this.servers.length
    },
    sortedServers: function () {
      return [...this.servers].sort((a, b) => b.game.player_count - a.game.player_count)
    }
  },
  methods: {
    serverClicked: function (key) {
      console.log(key)
    },
    fetchServers: function () {
      fetch('http://localhost:3000/servers')
        .then(res => {
          if (res.ok) { return res.json() } else { return Promise.reject(new Error(`${res.status}: ${res.statusText}`)) }
        }).then(res => {
          this.servers = res
        })
        .catch(err => console.error(err))
    },
    startFetchingServers: function () {
      this.fetchTimer = setInterval(() => this.fetchServers(), 5000)
    },
    stopFetchingServers: function () {
      clearInterval(this.fetchTimer)
    }
  },
  created () {
    this.fetchServers()
    this.startFetchingServers()
  },
  beforeDestroy () {
    clearInterval(this.fetchTimer)
  }
}
</script>

<style scoped>
td:hover {
  cursor: pointer;
}
</style>
