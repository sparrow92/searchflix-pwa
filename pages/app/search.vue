<template>
  <div>
    <Heading title="Szukaj" big>
      <Button @click.native="openSearch">Zaawansowane</Button>
    </Heading>

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
