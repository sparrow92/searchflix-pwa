<template>
  <div>
    <h1 class="mx-8">Do obejrzenia</h1>
    <Loader v-if="loading" />
    <Slider v-else v-for="(group, index) in grouped" :key="index" :movies="group.movies" :title="group.type === 'movie' ? 'filmy' : 'seriale'" @open="open" />   

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
      id: null,
      loading: false
    }
  },

  computed: {
    ...mapGetters([ 
      'getMovies'
    ]),

    grouped() {
      let obj = this.groupBy(this.getMovies, (movie) => movie.type);
      return Object.keys(obj).map(key => {
        return { 
          type: key, 
          movies: obj[key] 
        }
      })
    },

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

    groupBy(arr, f) {
      return arr.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    },

    close: function() {
      this.id = null;
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
