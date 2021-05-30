<template>
  <div class="w-full mb-5">
    <Heading class="mx-8" :title="title" :border="false" />

    <swiper :options="swiperOptions" class="w-full">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <Thumbnail :id="getId(movie)" :poster="movie.poster || movie.img" @click.native="open(movie)" />
        
      </swiper-slide>
      <div class="swiper-button-prev cursor-pointer mx-5" slot="button-prev"></div>
      <div class="swiper-button-next cursor-pointer mx-5" slot="button-next"></div>
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
        centeredSlides: false,
        allowTouchMove: this.$device.isMobileOrTablet,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
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
  .swiper-button-next, .swiper-button-prev {
    @apply text-white hidden md:flex;
  }
  .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
    @apply opacity-5;
  }
</style>
