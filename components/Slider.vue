<template>
  <div class="my-4">

    <h2 class="ml-8">{{ title }}</h2>

    <swiper :options="swiperOptions" class="w-screen">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <Thumbnail :id="movie.nfid" />
      </swiper-slide>
    </swiper>  

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    movies: Array
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        loop: false,
        spaceBetween: 10,
        centeredSlides: false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .swiper-slide {
    @apply w-52;
  }
</style>
