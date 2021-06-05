<template>
  <div class="w-full">
    <Heading title="Wyszukiwarka" big>
      <div class="hidden md:flex">
        <Button @click.native="openSearch" icon="adjustments" type="light" :count="count" small>Filtry</Button>        
      </div>
    </Heading>

    <div class="flex flex-wrap md:flex-nowrap items-center w-full p-8 mb-5 mt-5 md:mb-5 md:mt-0 bg-white bg-opacity-5">
      <input type="text" placeholder="Wpisz tytuł filmu..." class="form__input mr-3 md:mr-10">
      <div class="md:hidden">
        <Button @click.native="openSearch" icon="adjustments" type="light" class="mr-3" :count="count">Filtry</Button>
      </div>
      <Button @click.native="search" icon="search">Szukaj</Button>
    </div>

    <NoData v-if="true" icon="search-circle" title="Brak wyników dla podanych kryteriów" />
    <Loader v-if="loading" class="my-32" />  
    <MovieSlider v-else :movies="movies" title="Wyniki" @open="openDetails" />

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
      showSearch: false,
      showDetails: false,
      movies: [],
      id: 0,
      loading: false,
      count: 0
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
      this.showDetails = false;
    },

    openSearch: function() {
      this.showSearch = true;
    },

    openDetails: function() {
      this.id = null;
      this.showDetails = true;
    },

    search: function() {
      return false;

      this.loading = true;
      this.$axios.get('/search', { params: this.getQuery }).then(response => {
        this.movies = response.data.results
      }).catch(() => {

      }).then(() => {
        this.loading = false;
      })
    }
  },

  created() {
    // this.search()
  }
}
</script>

<style lang="postcss" scoped>
.query {
  @apply block;
}
</style>
