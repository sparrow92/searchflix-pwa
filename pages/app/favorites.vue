<template>
  <div>
    <h1 class="mx-8">Do obejrzenia</h1>
    <p class="mx-8">
      <img v-for="movie in getMovies" :key="movie.id" :src="movie.image" @click="open(movie.id)">  
    </p>
    <Details :id="id" :show="showDetails" @close="close" /> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'app',

  data() {
    return {
      showDetails: false,
      id: null
    }
  },

  computed: {
    ...mapGetters([ 
      'getMovies'
    ])
  },

  methods: {
    close: function() {
      this.showDetails = false;
    },

    open: function(value) {
      this.id = value
      this.showDetails = true
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
