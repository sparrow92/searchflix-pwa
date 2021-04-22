<template>
  <div class="transition-all duration-200 fixed top-0 justify-center ites-start md:items-center z-50 flex w-full h-screen bg-black bg-opacity-60" :class="show ? 'visible opacity-100' : 'invisible opacity-0'">
    <div class="transition-all overflow-scroll transform duration-200 w-screen mx-3 mt-16 md:mt-0 md:mb-0 md:w-96 flex flex-col bg-white rounded-xl shadow-lg" :class="show ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-50'">
      <div class="relative flex justify-center border-b border-gray-200 p-5">
        <solid-x-icon class="w-7 h-7 text-red cursor-pointer absolute inset-y-0 right-4 m-auto" @click.native="close" />
      </div>
      <div class="text-black">

        <h2>{{ id }}</h2>
        {{ details }}
        <button class="mt-5 rounded uppercase py-3 px-8 bg-red text-white text-xl font-bold shadow-lg" @click="addToList">Zapisz na liście</button>
        
      </div>
    </div>    
  </div>
</template>

<script>
import mock from '@/api/mock/index'

export default {
  props: {
    id: Number,
    show: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      images: [],
      details: []
    }
  },

  computed: {
    photo() {
      return this.images.find(image => {
        return image.itype == 'bo1280x448'
      });
    },

    movie() {
      return this.details.find(movie => {
        return movie.netflixid
      });
    }
  },

  methods: {
    async getImages() {
      if (this.id) {
        this.images = await mock.fetchMovieImages(this.id);
      }
    },

    async getDetails() {
      if (this.id) {
        this.details = await mock.fetchMovieDetails(this.id);
      }
    },

    addToList() {
      console.log(`Metoda zapisująca film o ${this.id} na listę!`)
    },

    close: function() {
      this.$emit('close');
    },
  },

  created() {
    this.getImages();
    this.getDetails();
  }
}
</script>

<style lang="postcss">

</style>
