<template>
  <b-navbar class="is-black">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        AC Tracker
      </b-navbar-item>
    </template>

    <template #start>
    </template>

    <template #end>
      <b-navbar-item tag="a" href="https://github.com/jasbrake/actracker">
        <b-icon pack="fab" icon="github" size="is-large" />
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
