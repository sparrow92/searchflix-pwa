<template>
  <div>
    <h1 class="mx-8">Do obejrzenia</h1>
    <div class="grid mx-8 gap-4">
      <div 
        @click="open(movie.id)" 
        v-for="movie in getMovies" 
        :key="movie.id" 
        :style="[bgStyle, { backgroundImage: `url(${movie.image})` }]" 
        class="relative flex justify-between items-center"
      >
        <solid-star-icon class="w-7 h-7 text-red shadow-2xl cursor-pointer absolute right-2 top-2 m-auto" @click="removeMovie(movie.id)"  />
      </div>
    </div>
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
    ]),

    bgStyle() {
      return {
        width: '120px',
        paddingTop: '142%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }
    }
  },

  methods: {
    ...mapActions([
      'removeMovie'
    ]),

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
