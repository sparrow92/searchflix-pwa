<template>
  <Modal :show="show" @close="close" type="blacklist">      
    <template v-slot:header>
      Czarna lista
    </template>

    <input type="text" placeholder="Wpisz gatunek..." class="form__input small" v-model="selected">
    <Loader v-if="_.isEmpty(genres)" class="py-16" />  
    <div v-else class="flex flex-wrap mt-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <Badge v-for="(item, index) in filteredGenres" :key="index" type="add" @click.native="add(item)">{{ item.genre }}</Badge>
      <span v-show="genres.length > genreLimit && filteredGenres.length" @click="genreLimit = genres.length" class="show-more">Wczytaj pozostałe...</span>
      <span v-show="!filteredGenres.length" class="no-data">Brak szukanych gatunków...</span>
    </div>   
    <div class="flex flex-wrap mt-2">
      <Badge v-for="(item, index) in getBlacklist" :key="index" @action="remove(item.netflixid)">{{ item.genre }}</Badge>
    </div>   

    <template v-slot:footer>
      <Button @click.native="reset" type="light" class="mr-3">Wyczyść</Button>
      <Button @click.native="close">Zamknij</Button>
    </template>

  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mock from '@/api/mock/index'

export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      selected: '',
      genres: [],
      genreLimit: 10
    }
  },

  computed: {
    ...mapGetters([
      'getBlacklist'
    ]),

    reducedGenres() {
      return this._.differenceWith(this.genres, this.getBlacklist, function(o1, o2) {
        return o1['netflixid'] === o2['netflixid']
      })
    },

    filteredGenres() {
      return this.reducedGenres.filter((item) => {
        return item.genre.toLowerCase().includes(this.selected.toLowerCase());
      }).slice(0, this.genreLimit)
    },
  },

  methods: {
    ...mapActions([
      'addGenre',
      'removeGenre',
      'resetBlacklist'
    ]),

    add(item) {
      this.addGenre(item)
    },

    remove(id) {
      this.removeGenre(id)
    },

    reset: function() {
      this.resetBlacklist();
    },

    close: function() {
      this.$emit('close');
    },
  },

  async mounted() {
    this.genres = await mock.fetchGenres();
  }
}
</script>

<style lang="postcss">
.show-more {
  @apply my-auto p-2 text-gray-500 cursor-pointer font-semibold text-sm whitespace-nowrap;
}

.no-data {
  @apply my-auto py-2 text-gray-500 cursor-pointer font-semibold text-lg whitespace-nowrap;;
}
</style>
