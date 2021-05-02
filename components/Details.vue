<template>
  <Modal :show="show" @close="close" :background="photo.url" :key="modalKey">      
    <template v-slot:header>
    <Button small v-if="!isSaved" @click.native="addToList">Zapisz na liście</Button>
    <Button small v-else @click.native="removeFromList">Usuń</Button>
    </template>

    <h2 v-html="movie.title" />


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
      let movie = this.details.find(movie => {
        return movie.netflixid
      });

      return movie || ''
    },

    poster() {
      return this.images.find(image => {
        return image.itype == 'bo342x684'
      });
    },

    isSaved() {
      let array = this.getMovies.filter(movie => {
        return movie.id == this.id
      })
      
      return array.length > 0
    }
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
