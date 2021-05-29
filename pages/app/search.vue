<template>
  <div class="w-full">
    <Heading title="Wyszukiwarka" big>
      <div class="hidden md:flex">
        <Button @click.native="openSearch" icon="adjustments" type="light" :count="18" small>Filtry</Button>        
      </div>
    </Heading>

    <div class="flex flex-wrap md:flex-nowrap items-end gap-3 md:gap-10 w-full p-8 mb-5 mt-5 md:mb-5 md:mt-0 bg-white bg-opacity-10">
      <input type="text" class="flex-grow block bg-transparent border-b border-white focus:border-red py-3 text-white text-2xl outline-none mb-5 md:mb-0">
      <div class="md:hidden">
        <Button @click.native="openSearch" icon="adjustments" type="light" :count="18">Filtry</Button>
      </div>
      <Button @click.native="search" icon="search-circle">Szukaj</Button>
    </div>

    <p class="mx-8">      

      <span class="query" v-if="getQuery.query">
        <span class="title">Nazwa:</span>
        <span>{{ getQuery.query }}</span>
      </span>

      <span class="query" v-if="getQuery.genre_list">
        <span class="title">Gatunek:</span>
        <span>{{ getQuery.genre_list }}</span>
      </span>

      <span class="query" v-if="getQuery.type">
        <span class="title">Typ:</span>
        <span>{{ getQuery.type }}</span>
      </span>

      <span class="query" v-if="getQuery.start_year">
        <span class="title">Od roku:</span>
        <span>{{ getQuery.start_year }}</span>
      </span>

      <span class="query" v-if="getQuery.end_year">
        <span class="title">Do roku:</span>
        <span>{{ getQuery.end_year }}</span>
      </span>

      <span class="query" v-if="getQuery.audiosubtitle_andor">
        <span class="title">Napisy, audio:</span>
        <span>{{ getQuery.audiosubtitle_andor }}</span>
      </span>

      <span class="query" v-if="getQuery.start_rating">
        <span class="title">Oceny od:</span>
        <span>{{ getQuery.start_rating }}</span>
      </span>

      <span class="query" v-if="getQuery.end_rating">
        <span class="title">Oceny do:</span>
        <span>{{ getQuery.end_rating }}</span>
      </span>

      <span class="query" v-if="getQuery.subtitle">
        <span class="title">Napisy:</span>
        <span>{{ getQuery.subtitle }}</span>
      </span>

      <span class="query" v-if="getQuery.audio">
        <span class="title">Lektor:</span>
        <span>{{ getQuery.audio }}</span>
      </span>

      <span class="query" v-if="getQuery.countrylist">
        <span class="title">Kraje:</span>
        <span>{{ getQuery.countrylist }}</span>
      </span>

      
    </p>

    <NoData v-if="true" icon="search-circle" title="Brak wyników dla podanych kryteriów" />
    <Loader v-if="loading" />  
    <Slider v-else :movies="movies" title="Wyniki" @open="openDetails" />

    <Details :id="id" :show="showDetails" @close="closeDetails" /> 
    <SearchQuery :show="showSearch" @close="closeSearch" @search="search" /> 
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
      loading: false
    }
  },

  computed: {
    ...mapGetters([
      'getQuery'
    ])
  },

  methods: {
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
