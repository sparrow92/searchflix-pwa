<template>
  <div class="bg-white bg-opacity-10">
    <div v-if="photo" class="w-auto bg-cover" :style="`background-image: url(${photo.url}); padding-top: 56.25%;`"></div>
    <div v-else class="w-auto" style="padding-top: 56.25%;"></div>
  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  props: {
    id: Number,
  },

  data() {
    return {
      images: [],
    }
  },

  computed: {
    photo() {
      return this.images.find(image => {
        return image.itype == 'bo1280x448'
      });
    }
  },

  methods: {
    async getImages() {
      const images = await mock.fetchMovieImages(this.id);
      this.images = images
    },
  },

  created() {
    this.getImages();
  }
}
</script>

<style lang="postcss">

</style>
