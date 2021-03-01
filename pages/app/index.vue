<template>
  <div class="flex flex-col items-start justify-center py-8">
    <h1 class="ml-8">Strona Główna</h1>

    <Slider :movies="movies" title="Horrory" @open="open" />
    <Slider :movies="movies" title="Thrillery" @open="open" />
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

  methods: {
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
