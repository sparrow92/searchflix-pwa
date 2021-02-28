<template>
  <div class="my-4">

    <h2 class="ml-8">{{ title }}</h2>

    <swiper :options="swiperOptions" class="w-screen">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <div class="w-auto bg-cover" :style="`background-image: url(${movie.photo}); padding-top: 56.25%;`">
        </div>
      </swiper-slide>
    </swiper>  

  </div>
</template>

<script>
export default {
  props: {
    title: String
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 10,
        centeredSlides: false
      },
      movies: [
        {
          photo: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTFKqHnL3xuQHqKbAdxLNwDizWWjEFdQDlqlxHQVC2RJ025GxCTXCHAdRzleu0_TkVtvzIItgvdeSid61lE6S1b24jPgGE-iYOb7JV0V1dejBB1bTMTcFsEbLKABaw.jpg?r=e5c',
        },
        {
          photo: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABfrRJSFVediqBG-zv8Sc3mrT8L0MASO3-S1JF8xud8YIQSFBPZbmFkU2Stg-8CTP_YZ-okQfSuB9xSPD-FMCppJHIvAurcIfq4ZUV41t4GAUXixP_bhp0p-fZW4JNA.jpg?r=aed',
        },
        {
          photo: 'https://occ-0-2851-38.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABemW3b0xFlun8ByWZKfDQ6XE9LaL2OkduM4p5s8iRqI5LMW2WREioaCj20vBrjIxdP4Rv2PIA-1TnHdB3n8OTTL-iKFq8-qwMoGsS_HoPf1eydXoEEe1RH2V4DQy_A.jpg?r=c28',
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
  .swiper-slide {
    @apply w-52;
  }
</style>
