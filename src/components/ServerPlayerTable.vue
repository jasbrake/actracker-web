<template>
  <div class="header has-text-centered">
    <p class="is-size-5">{{ teamName }}</p>
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th class="has-text-centered"><b-tooltip label="Location" type="is-dark"><b-icon icon="globe-americas"></b-icon></b-tooltip></th>
          <th><b-tooltip label="Name" type="is-dark"><b-icon icon="user"></b-icon></b-tooltip></th>
          <th v-if="flagMode" class="has-text-centered"><b-tooltip label="Flags" type="is-dark"><b-icon icon="flag"></b-icon></b-tooltip></th>
          <th class="has-text-centered"><b-tooltip label="Kills" type="is-dark"><b-icon icon="crosshairs"></b-icon></b-tooltip></th>
          <th class="has-text-centered"><b-tooltip label="Deaths" type="is-dark"><b-icon icon="skull"></b-icon></b-tooltip></th>
          <th class="is-hidden-mobile has-text-centered"><b-tooltip label="K/D" type="is-dark"><b-icon icon="percentage"></b-icon></b-tooltip></th>
          <th v-if="teamMode" class="is-hidden-mobile has-text-centered"><b-tooltip label="Teamkills" type="is-dark"><b-icon icon="angry"></b-icon></b-tooltip></th>
          <th class="is-hidden-mobile"><b-tooltip label="Address" type="is-dark"><b-icon icon="at"></b-icon></b-tooltip></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in players" :key="p.client_number">
          <td class="has-text-centered"><b-tooltip :label="p.country" type="is-dark"><span :class="['flag-icon', 'flag-icon-' + p.country_iso.toLowerCase()]"></span></b-tooltip></td>
          <td>{{ p.name }}</td>
          <td v-if="flagMode" class="has-text-centered">{{ p.flags }}</td>
          <td class="has-text-centered">{{ p.kills }}</td>
          <td class="has-text-centered">{{ p.deaths }}</td>
          <td class="is-hidden-mobile has-text-centered">{{ kdr(p.kills, p.deaths).toFixed(2) }}</td>
          <td v-if="teamMode" class="is-hidden-mobile has-text-centered"><span v-if="p.teamkills > 2" class="teamkiller-red">{{ p.teamkills }}</span><span v-else>{{ p.teamkills }}</span></td>
          <td class="is-hidden-mobile">{{ p.ip }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ServerPlayerTable',
  props: {
    players: Array,
    flagMode: Boolean,
    teamMode: Boolean,
    teamName: String
  },
  methods: {
    kdr (kills, deaths) {
      if (kills === 0 && deaths === 0) return 0
      if (deaths === 0) return kills
      return kills / deaths
    }
  }
}
</script>

<style scoped>
.header {
  color: white;
  border-radius: 10px;
}
.cla {
  background-color: red;
}
.rvsf {
  background-color: blue;
}
.normal {
  background-color: black;
}
.teamkiller-red {
  color: red;
}
</style>
