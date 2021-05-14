<template>
  <div>
    <h1 class="ml-8">Strona Główna</h1>
    <Slider v-for="(group, index) in grouped" :key="index" :movies="group.movies" :title="$moment(group.date, 'YYYY-MM-DD').fromNow()" @open="open" />

    <Details :id="id" :show="showDetails" @close="close" /> 

  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  layout: 'app',

  async asyncData() {
    const movies = await mock.fetchExpiringMovies()
    return { movies }
  },

  data() {
    return {
      showDetails: false,
      id: null
    }
  },

  computed: {
    grouped() {
      let obj = this.groupBy(this.movies, (movie) => movie.expiredate);
      let array = Object.keys(obj).map(key => {
        return { 
          date: key, 
          movies: obj[key] 
        }
      })
      return array.reverse()
    }
  },

  methods: {
    groupBy(movies, f) {
      return movies.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    },

    close: function() {
      this.id = null;
      this.showDetails = false;
    },

    open: function(value) {
      this.id = value
      this.showDetails = true
    }
  },

  mounted() {
    this.movies.map(movie => movie.poster = '')
  }
}
</script>
