<template>
  <Modal :show="show" @close="close" :background="photo.url" :key="modalKey">      
    <template v-slot:header>
      {{ id }}
    </template>

    <h2>{{ id }}</h2>
    {{ getMovies }}
    <button class="mt-5 rounded uppercase py-3 px-8 bg-red text-white text-xl font-bold shadow-lg" @click="addToList">Zapisz na liście</button>
    <button class="mt-5 rounded uppercase py-3 px-8 bg-red text-white text-xl font-bold shadow-lg" @click="removeFromList">usuń</button>

  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
        this.getImages(value);
        this.getDetails(value);
      }
    }
  },

  computed: {
    ...mapGetters([ 
      'getMovies'
    ]),

    photo() {
      return this.images.find(image => {
        return image.itype == 'bg'
      });
    },

    movie() {
      return this.details.find(movie => {
        return movie.netflixid
      });
    },

    poster() {
      return this.images.find(image => {
        return image.itype == 'bo166x236'
      });
    },
  },

  methods: {
    ...mapActions([
      'addMovie',
      'removeMovie'
    ]),

    async getImages(id) {
      this.images = await mock.fetchMovieImages(id);
    },

    async getDetails(id) {
      this.details = await mock.fetchMovieDetails(id);
    },

    addToList() {
      this.addMovie({ id: this.id, image: this.poster.url})
    },

    removeFromList() {
      this.removeMovie(this.id);
    },

    close: function() {
      this.$emit('close');
    },
  },
}
</script>

<style lang="postcss">

</style>
