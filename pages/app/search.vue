<template>
  <div class="w-full">
    <Heading title="Wyszukiwarka" big>
      <div class="hidden md:flex">
        <Button @click.native="openSearch" icon="adjustments" type="light" :count="count" small>Filtry</Button>        
      </div>
    </Heading>

    <div class="flex flex-wrap md:flex-nowrap items-center w-full p-8 mb-5 mt-5 md:mb-5 md:mt-0 bg-white bg-opacity-5">
      <input type="text" placeholder="Wpisz tytuł filmu..." class="form__input mr-3 md:mr-10" v-model="searchQuery" @keyup.enter="search">
      <div class="md:hidden">
        <Button @click.native="openSearch" icon="adjustments" type="light" class="mr-3 my-1 md:my-0" :count="count">Filtry</Button>
      </div>
      <Button @click.native="search" icon="search" class="my-1 md:my-0">Szukaj</Button>
    </div>

    <NoData v-if="_.isEmpty(movies) && !loading" icon="search-circle" title="Brak wyników dla podanych kryteriów" />
    <Loader v-if="loading" class="my-32" />  
    <MovieSlider v-if="!_.isEmpty(movies) && !loading" :movies="movies" title="Wyniki" @open="openDetails" />

    <Details :id="id" :show="showDetails" @close="closeDetails" /> 
    <Filters :show="showSearch" @close="closeSearch" @search="search" :count="count" @filters="updateCount" /> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',

  data() {
    return {
      searchQuery: '',
      showSearch: false,
      showDetails: false,
      movies: [],
      id: 0,
      loading: false,
      count: 0,
      debugMode: process.env.DEBUG_MODE,
      query: []
    }
  },

  computed: {
    ...mapGetters([
      'getQuery'
    ])
  },

  methods: {
    updateCount(e) {
      this.count = e;
    },

    closeSearch: function() {
      this.showSearch = false;
    },

    closeDetails: function() {
      this.id = null;
      this.showDetails = false;
    },

    openSearch: function() {
      this.showSearch = true;
    },

    openDetails: function(value) {
      this.id = value;
      this.showDetails = true;
    },

    search: function() {
      if (this.debugMode === "true") {
        console.log("Tryb debugowania. Brak możliwości wyszukiwania.");
      } else {
        this.loading = true;
        this.query = Object.assign({}, this.getQuery);
        this.query.query = this.searchQuery;
        this.$axios.get('/search', { params: this.query }).then(response => {
          this.movies = response.data.results
        }).catch(() => {}).then(() => {
          this.loading = false;
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.query {
  @apply block;
}
</style>
