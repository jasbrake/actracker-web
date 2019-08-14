<template>
  <section class="section">
    <div class="container is-full">
      <h1 class="title">Search</h1>
      <section>
        <b-field>
          <b-radio-button v-model="searchType" native-value="player">
            <span>Player</span>
          </b-radio-button>
          <b-radio-button v-model="searchType" native-value="game">
            <span>Game</span>
          </b-radio-button>
        </b-field>
        <b-field>
          <b-input label="Search">
          </b-input>
        </b-field>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      searchType: 'player'
    }
  }
}
</script>

<style>

</style>
