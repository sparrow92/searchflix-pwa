<template>
  <div class="my-4">

    <h2 class="ml-8">{{ title }}</h2>

    <swiper :options="swiperOptions" class="w-screen">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <Thumbnail :id="getId(movie)" :poster="movie.poster || movie.img" @click.native="open(movie)" />
        
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
        spaceBetween: 5,
        centeredSlides: false
      }
    }
  },

  methods: {
    open: function (movie) {
      let id = this.getId(movie);
      this.$emit('open', id);
    },

    getId: function (movie) {
      return movie.netflixid || movie.nfid
    }
  }


}
</script>

<style lang="postcss" scoped>
  .swiper-slide {
    @apply w-44;
  }
</style>
