<template>
  <div class="flex flex-col items-start justify-center py-8">
    <h1 class="ml-8">Strona Główna</h1>

    <Slider v-for="(group, index) in grouped" :key="index" :movies="group" :title="index" @open="open" />

    <Details :id="id" :show="showDetails" @close="close" /> 

  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  layout: 'app',

  async asyncData() {
    const movies = await mock.fetchMovies()
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
      return this.groupBy(this.movies, (movie) => movie.year);
    }
  },

  methods: {
    groupBy(xs, f) {
      return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    },

    close: function() {
      this.showDetails = false;
    },

    open: function(id) {
      this.showDetails = true
      this.id = id
    }
  }
}
</script>
