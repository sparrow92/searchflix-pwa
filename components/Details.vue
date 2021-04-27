<template>
  <Modal :show="show" @close="close" :background="photo.url" :key="modalKey">      
    <template v-slot:header>
      {{ id }}
    </template>

    <h2>{{ id }}</h2>
    {{ images }}
    <button class="mt-5 rounded uppercase py-3 px-8 bg-red text-white text-xl font-bold shadow-lg" @click="addToList">Zapisz na liście</button>

  </Modal>
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
      images: [{ 
        url: '', 
        itype: 'bg'
      }],
      details: [],
      modalKey: 0,
    }
  },

  watch: {
    id (value) {
      if (value) {
        this.getImages();
        this.getDetails();
        this.modalKey++
      }
    }
  },

  computed: {
    photo() {
      return this.images.find(image => {
        return image.itype == 'bg'
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
      this.images = await mock.fetchMovieImages(this.id);
    },

    async getDetails() {
      this.details = await mock.fetchMovieDetails(this.id);
    },

    addToList() {
      console.log(`Metoda zapisująca film o ${this.id} na listę!`)
    },

    close: function() {
      this.$emit('close');
    },
  },
}
</script>

<style lang="postcss">

</style>
