<template>
  <div class="bg-white bg-opacity-10 cursor-pointer">
    <div class="w-auto bg-cover" :style="`background-image: url(${photo}); padding-top: 142%;`"></div>
    <!-- <div class="w-auto" style="padding-top: 142%;"></div> -->
  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  props: {
    id: Number,
    poster: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      images: [],
      debugMode: process.env.DEBUG_MODE,
    }
  },

  computed: {
    photo() {
      let image = this.images.find(image => {
        return image.itype == 'bo342x684'
      });
      return  image ? image.url : this.poster
    }
  },

  methods: {
    async getImages() {
      if (this.debugMode === "true") {
        this.images = await mock.fetchMovieImages(this.id);
      } else {
        const response = await this.$axios.get('/images', { 
          params: {
            netflixid: this.id            
          }
         });

        this.images = response.data.results;
      }
    },
  },

  created() {
    if (!this.poster) {
      this.getImages();
    }
  }
}
</script>

<style lang="postcss">

</style>
