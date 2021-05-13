<template>
  <Modal :show="show" @close="close" :background="photo.url" :key="modalKey" :loading="loading">      
    <template v-slot:header>
    <Button small v-if="!isSaved" @click.native="addToList">Zapisz na liście</Button>
    <Button small v-else @click.native="removeFromList">Usuń z listy</Button>
    </template>

    <span v-if="!movie.netflixruntime || false" class="absolute top-0 right-0 uppercase font-semibold text-xs py-1 px-3 bg-gray-700 rounded-l">
      Serial
    </span>

    <span class="text-xl font-bold mr-2" v-html="movie.title" />
    <span class="text-gray-500 font-semibold" v-html="movie.year" />
    <p class="mt-3 mb-5" v-html="movie.synopsis" />

    <p v-if="movie.imdbgenre" class="text-sm mt-2 font-semibold">
      <span class="text-gray-500">Kategorie:</span>
      <span>{{ movie.imdbgenre }}</span>
    </p>

    <p v-if="movie.netflixruntime" class="text-sm mt-2 font-semibold">
      <span class="text-gray-500">Czas trwania:</span>
      <span>{{ Math.round(movie.netflixruntime/60) }} min</span>
    </p>

    <div v-if="movie.imdbrating" class="block rounded mt-4 flex items-center gap-3">
      <img src="@/assets/images/imdb.png" class="w-8 h-8">
      <span class="text-lg font-semibold text-yellow-400">
        {{ movie.imdbrating }}
        <span class="text-gray-500 text-base">/ 10</span>
      </span>
    </div>

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
      images: [],
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

    loading() {
      return this._.isEmpty(this.images) && this._.isEmpty(this.details)
    },

    photo() {
      let image = this.images.find(image => {
        return image.itype == 'bg'
      });
      return image || ''
    },

    movie() {
      let movie = this.details.find(movie => {
        return movie.netflixid
      });

      return movie || ''
    },

    type() {
      return this.movie.netflixruntime ? 'movie' : 'series'
    },

    poster() {
      return this.images.find(image => {
        return image.itype == 'bo342x684'
      });
    },

    isSaved() {
      let array = this.getMovies.filter(movie => {
        return movie.netflixid == this.id
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
      this.addMovie({ netflixid: this.id, poster: this.poster.url, type: this.type })
    },

    removeFromList() {
      this.removeMovie(this.id);
    },

    reset() {
       Object.assign(this.$data, this.$options.data())
    },

    close: function() {
      this.reset();
      this.$emit('close');
    },
  },
}
</script>

<style lang="postcss">

</style>
