<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th class="has-text-centered"><b-tooltip label="Location" type="is-dark"><b-icon icon="globe-americas"></b-icon></b-tooltip></th>
        <th><b-tooltip label="Name" type="is-dark"><b-icon icon="user"></b-icon></b-tooltip></th>
        <th v-if="flagMode" class="has-text-centered"><b-tooltip label="Flags" type="is-dark"><b-icon icon="flag"></b-icon></b-tooltip></th>
        <th class="has-text-centered"><b-tooltip label="Kills" type="is-dark"><b-icon icon="plus-circle"></b-icon></b-tooltip></th>
        <th class="has-text-centered"><b-tooltip label="Deaths" type="is-dark"><b-icon icon="skull"></b-icon></b-tooltip></th>
        <th class="has-text-centered"><b-tooltip label="Teamkills" type="is-dark"><b-icon icon="angry"></b-icon></b-tooltip></th>
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
        <td class="has-text-centered">{{ p.teamkills }}</td>
        <td class="is-hidden-mobile">{{ p.ip }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'GameStats',
  props: {
    'players': Array,
    'flagMode': Boolean
  }
}
</script>

<style scoped>
</style>
