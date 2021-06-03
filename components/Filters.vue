<template>
  <Modal :show="show" @close="close" type="search">
    <template v-slot:header>
      <div class="flex items-center gap-3">
        <span>Filtry wyszukiwania</span>
        <span v-if="counter" class="rounded-full font-semibold flex items-center justify-center text-sm bg-gradient-to-b from-red to-red-900 w-6 h-6">10</span>
      </div>
    </template>

    <div class="grid grid-cols-2 gap-4 w-full">

      <div class="section col-span-2">
        <input type="text" placeholder="Wpisz gatunek..." class="form__input small" v-model="genre">
        <div class="flex flex-wrap mt-4 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Badge v-for="(item, index) in filteredGenres" :key="index" type="add" @click.native="addGenre(item)">{{ item.genre }}</Badge>
          <span v-show="genres.length > genreLimit && filteredGenres.length" @click="genreLimit = genres.length" class="show-more">Wczytaj pozostałe...</span>
          <span v-show="!filteredGenres.length" class="no-data">Brak szukanych gatunków...</span>
        </div>   
        <div class="flex flex-wrap mt-2">
          <Badge v-for="(item, index) in selectedGenres" :key="index" @action="removeGenre(item.netflixid)">{{ item.genre }}</Badge>
        </div>   
      </div>

      <div class="section col-span-2">
        <input type="text" placeholder="Wpisz kraj produkcji..." class="form__input small" v-model="country">
        <div class="flex flex-wrap mt-4 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Badge v-for="(item, index) in filteredCountries" :key="index" type="add" @click.native="addCountry(item)">{{ item.country }}</Badge>
          <span v-show="countries.length > countryLimit && filteredCountries.length" @click="countryLimit = countries.length" class="show-more">Wczytaj pozostałe...</span>
          <span v-show="!filteredCountries.length" class="no-data">Brak szukanych krajów...</span>
        </div>  
        <div class="flex flex-wrap mt-2">
          <Badge v-for="(item, index) in selectedCountries" :key="index" @action="removeCountry(item.id)">{{ item.country }}</Badge>
        </div>  
      </div>

      <div class="section col-span-2">
        <span class="title">Kraj produkcji</span>
        <div class="block h-10"></div>
        <Slider v-model="years" :min="1900" :max="2021" class="px-5" />          
      </div>

      <div class="section col-span-2 md:col-span-1">
        <span class="title">Typ</span>
        <div class="flex gap-5">
          <Toggle name="Seriale" :checked="type.series" @click.native="type.series = !type.series" />
          <Toggle name="Filmy" :checked="type.movie" @click.native="type.movie = !type.movie" />            
        </div>   
      </div>

      <div class="section col-span-2 md:col-span-1">
        <span class="title">Oceny</span>
        <div class="block h-10"></div>
        <Slider v-model="rating" :min="0" :max="10" class="px-2.5" />          
      </div>

    </div>

    <template v-slot:footer>
      <div class="flex gap-3">
        <Button @click.native="reset">Resetuj</Button>
        <Button @click.native="search" type="light">Zastosuj</Button>          
      </div>
    </template>
  </Modal>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'
import mock from '@/api/mock/index'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Slider },

  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },

  watch: {
    show (value) {
      if (value) {
        this.queryData = {...this.getQuery}
      }
    }
  },

  data() {
    return {
      genre: '',
      country: '',
      years: [1900, 2021],
      rating: [0, 10],
      genres: [],
      countries: [],
      selectedGenres: [],
      selectedCountries: [],
      genreLimit: 10,
      countryLimit: 10,
      type: {
        series: true,
        movie: true
      },
      queryData: {
        query: '',
        limit: 5, // max 100
        offset: 0, // pagination
        genre_list: '',
        type: '', // movie or series
        start_year: '',
        end_year: '',
        audiosubtitle_andor: '', // audio end/or subtitles
        start_rating: '',   // 0-10
        end_rating: '',  // 0-10
        subtitle: '',
        audio: '',
        countrylist: '', // country from settings
      }
    }
  },

  computed: {
    ...mapGetters([
      'getQuery'
    ]),

    reducedCountries() {
      return this._.differenceWith(this.countries, this.selectedCountries, function(o1, o2) {
        return o1['id'] === o2['id']
      })
    },

    reducedGenres() {
      return this._.differenceWith(this.genres, this.selectedGenres, function(o1, o2) {
        return o1['netflixid'] === o2['netflixid']
      })
    },

    filteredCountries() {
      return this.reducedCountries.filter((item) => {
        return item.country.toLowerCase().includes(this.country.toLowerCase());
      }).slice(0, this.countryLimit)
    },

    filteredGenres() {
      return this.reducedGenres.filter((item) => {
        return item.genre.toLowerCase().includes(this.genre.toLowerCase());
      }).slice(0, this.genreLimit)
    },

    counter() {
      return 15
    }
  },

  methods: {
    ...mapActions([
      'saveQuery'
    ]),

    addCountry(country) {
      let array = this.selectedCountries.filter(item => {
        return item.id === country.id
      });

      if (!array.length) {
        this.selectedCountries.push(country)
      }
    },

    addGenre(genre) {
      let array = this.selectedGenres.filter(item => {
        return item.netflixid === genre.netflixid
      });

      if (!array.length) {
        this.selectedGenres.push(genre)
      }
    },

    removeCountry(id) {
      let array = this.selectedCountries.filter(item => {
        return item.id === id
      });

      if (array.length) {
        this.selectedCountries.splice(this.selectedCountries.map(item => item.id).indexOf(id), 1)
      }
    },

    removeGenre(id) {
      let array = this.selectedGenres.filter(item => {
        return item.netflixid === id
      });

      if (array.length) {
        this.selectedGenres.splice(this.selectedGenres.map(item => item.netflixid).indexOf(id), 1)
      }
    },

    reset: function() {

    },

    search: function() {
      this.saveQuery(this.queryData)
      this.$emit('search');
      this.close()
    },

    close: function() {
      this.$emit('close');
    },
  },  
  
  async mounted() {
    this.genres = await mock.fetchGenres();
    this.countries = await mock.fetchCountries();
  }
}
</script>

<style src="@vueform\slider\themes\default.css"></style>
<style lang="postcss">
input {
  @apply text-black;
}

.show-more {
  @apply my-auto p-2 text-gray-500 cursor-pointer font-semibold text-sm whitespace-nowrap;
}

.no-data {
  @apply my-auto py-2 text-gray-500 cursor-pointer font-semibold text-lg whitespace-nowrap;;
}

.slider-connect {
  @apply bg-red;
}

.slider-tooltip {
  @apply bg-red border border-red;
}

.section {
  @apply border-gray-800 border rounded-lg p-4;

  .title {
    @apply block mb-4 text-gray-600 font-medium uppercase text-lg;
  }
}
</style>
