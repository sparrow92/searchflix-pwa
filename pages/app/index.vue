<template>
  <div class="flex flex-col items-start justify-center py-8">
    <h1 class="ml-8">Strona Główna</h1>

    <Slider :movies="movies" title="Horrory" />
    <Slider :movies="movies" title="Thrillery" />

  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  layout: 'app',

  async asyncData() {
    const movies = await mock.fetchMovies()
    return { movies }
  }
}
</script>
