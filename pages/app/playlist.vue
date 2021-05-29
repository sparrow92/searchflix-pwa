<template>
  <div>
    <Heading title="Do obejrzenia" class="mb-5" big>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet minima reprehenderit dicta, consectetur ipsa perferendis asperiores velit voluptatibus ipsam eos saepe blanditiis commodi rerum iusto animi quis natus enim tenetur!
      </span>
    </Heading>

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
