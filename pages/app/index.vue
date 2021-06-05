<template>
  <div>
    <Heading title="Strona Główna" class="mb-5" big>
      <span>Poniższa lista przedstawia produkcje, który w najbliższym czasie znikną z oferty Netflixa dla Twojego kraju.</span>
    </Heading>

    <NoData v-if="_.isEmpty(grouped) && !loading" icon="exclamation-circle" title="Brak danych" />
    <Loader v-if="loading" class="my-32" />
    <MovieSlider v-for="(group, index) in grouped" :key="index" :movies="group.movies" :title="$moment(group.date, 'YYYY-MM-DD').fromNow()" @open="open" />

    <Details :id="id" :show="showDetails" @close="close" /> 

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mock from '@/api/mock/index'

export default {
  layout: 'app',

  data() {
    return {
      showDetails: false,
      id: null,
      loading: false,
      debugMode: process.env.DEBUG_MODE,
      movies: [],
      limit: 10
    }
  },

  computed: {
    ...mapGetters([
      'selectedCountry'
    ]),

    grouped() {
      let obj = this.groupBy(this.movies.reverse().slice(0, this.limit).reverse(), (movie) => movie.expiredate);
      let array = Object.keys(obj).map(key => {
        return { 
          date: key, 
          movies: obj[key] 
        }
      })
      return array.reverse()
    },

  },

  methods: {
    groupBy(movies, f) {
      return movies.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    },

    close: function() {
      this.id = null;
      this.showDetails = false;
    },

    open: function(value) {
      this.id = value
      this.showDetails = true
    }
  },

  mounted() {
    this.movies.map(movie => movie.poster = '')
  },

  async created() {
    if (this.debugMode === "true") {
      this.movies = await mock.fetchExpiringMovies();
    } else {
      this.loading = true;
      const response = await this.$axios.get('/expiring', {   
        params: {
          countrylist: this.selectedCountry,
          offset: 10      
        }
      });

      this.movies = response.data.results
      this.loading = false;
    }
  }
}
</script>
