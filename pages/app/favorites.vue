<template>
  <div>
    <h1 class="mx-8">Do obejrzenia</h1>
    <p class="mx-8">
      <img v-for="movie in getMovies" :key="movie.id" :src="movie.image" alt="">  
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'app',

  data: function () {
    return {
    }
  },

  computed: {
    ...mapGetters([ 
      'getMovies'
    ])
  }
}
</script>

<style lang="postcss" scoped>

</style>
