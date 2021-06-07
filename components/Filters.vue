<template>
  <Modal :show="show" @close="close" type="search">
    <template v-slot:header>
      <div class="flex items-center">
        <span>Filtry wyszukiwania</span>
        <span v-if="count" class="rounded-full font-semibold flex items-center justify-center text-sm bg-gradient-to-b from-red to-red-900 w-6 h-6 ml-3">{{ count }}</span>
      </div>
    </template>

    <div class="grid grid-cols-2 gap-4 w-full">

      <div class="section col-span-2">
        <input type="text" placeholder="Wpisz gatunek..." class="form__input small" v-model="genre">
        <Loader v-if="_.isEmpty(genres)" class="py-16" />  
        <div v-else class="flex flex-wrap mt-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
        <Loader v-if="_.isEmpty(countries)" class="py-16" />  
        <div v-else class="flex flex-wrap mt-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Badge v-for="(item, index) in filteredCountries" :key="index" type="add" @click.native="addCountry(item)">{{ item.country }}</Badge>
          <span v-show="countries.length > countryLimit && filteredCountries.length" @click="countryLimit = countries.length" class="show-more">Wczytaj pozostałe...</span>
          <span v-show="!filteredCountries.length" class="no-data">Brak szukanych krajów...</span>
        </div>  
        <div class="flex flex-wrap mt-2">
          <Badge v-for="(item, index) in selectedCountries" :key="index" @action="removeCountry(item.id)">{{ item.country }}</Badge>
        </div>  
      </div>

      <div class="section col-span-2">
        <span class="title">Rok produkcji</span>
        <div class="block h-10"></div>
        <Slider v-model="years" :min="1900" :max="2021" class="px-5" />          
      </div>

      <div class="section col-span-2 md:col-span-1">
        <span class="title">Typ</span>
        <div class="flex">
          <Toggle name="Seriale" :checked="type.series" @click.native="type.series = !type.series" class="mr-5" />
          <Toggle name="Filmy" :checked="type.movie" @click.native="type.movie = !type.movie" />            
        </div>   
      </div>

      <div class="section col-span-2 md:col-span-1">
        <span class="title">Oceny</span>
        <div class="block h-10"></div>
        <Slider v-model="rating" :min="0" :max="10" class="px-2.5" />          
      </div>

      <div class="section col-span-2 md:col-span-1">
        <input type="text" placeholder="Język audio..." class="form__input small" v-model="audio">

        <Loader v-if="_.isEmpty(languages)" class="py-16" />  
        <div v-else class="flex flex-wrap mt-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Badge small v-for="(item, index) in filteredAudios" :key="index" type="add" @click.native="addAudio(item)" class="lowercase">{{ item.name }}</Badge>
          <span v-show="languages.length > 10 && filteredAudios.length"  @click="audioLimit = languages.length" class="show-more">Wczytaj pozostałe...</span>
          <span v-show="!filteredAudios.length" class="no-data">Nie ma takiego języka...</span>
        </div>   
        <div class="flex flex-wrap mt-2">
          <Badge small v-for="(item, index) in selectedAudios" :key="index" @action="removeAudio(item.code)" class="lowercase">{{ item.name }}</Badge>
        </div>  
      </div>

      <div class="section col-span-2 md:col-span-1">
        <input type="text" placeholder="Język napisów..." class="form__input small" v-model="subtitle">

        <Loader v-if="_.isEmpty(languages)" class="py-16" />  
        <div v-else class="flex flex-wrap mt-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <Badge small v-for="(item, index) in filteredSubtitles" :key="index" type="add" @click.native="addSubtitle(item)" class="lowercase">{{ item.name }}</Badge>
          <span v-show="languages.length > 10 && filteredSubtitles.length" @click="subtitlesLimit = languages.length" class="show-more">Wczytaj pozostałe...</span>
          <span v-show="!filteredSubtitles.length" class="no-data">Nie ma takiego języka...</span>
        </div>   
        <div class="flex flex-wrap mt-2">
          <Badge small v-for="(item, index) in selectedSubtitles" :key="index" @action="removeSubtitle(item.code)" class="lowercase">{{ item.name }}</Badge>
        </div>          
      </div>

    </div>

    <template v-slot:footer>
      <div class="flex">
        <Button @click.native="reset" class="mr-3">Resetuj</Button>
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
      debugMode: process.env.DEBUG_MODE,
      genre: '',
      country: '',
      audio: '',
      subtitle: '',
      years: [1900, 2021],
      rating: [0, 10],
      genres: [],
      countries: [],
      languages: [],
      selectedGenres: [],
      selectedCountries: [],
      selectedAudios: [],
      selectedSubtitles: [],
      genreLimit: 10,
      countryLimit: 10,
      audioLimit: 5,
      subtitlesLimit: 5,
      type: {
        series: true,
        movie: true
      },
      queryData: this.defaultQuery,
      defaultQuery: {
        query: '',
        limit: 25, // max 100
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

    count() {
      let arr = [
        !this._.isEmpty(this.selectedGenres),
        !this._.isEmpty(this.selectedCountries),
        this.years[0] !== 1900 || this.years[1] !== 2021,
        this.rating[0] !== 0 || this.rating[1] !== 10,
        this.type.movie !== this.type.series
      ];

      return arr.filter(Boolean).length;
    },

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

    reducedAudios() {
      return this._.differenceWith(this.languages, this.selectedAudios, function(o1, o2) {
        return o1['code'] === o2['code']
      })      
    },

    reducedSubtitles() {
      return this._.differenceWith(this.languages, this.selectedSubtitles, function(o1, o2) {
        return o1['code'] === o2['code']
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

    filteredAudios() {
      return this.reducedAudios.filter((item) => {
        return item.name.toLowerCase().includes(this.audio.toLowerCase());
      }).slice(0, this.audioLimit)      
    },

    filteredSubtitles() {
      return this.reducedSubtitles.filter((item) => {
        return item.name.toLowerCase().includes(this.subtitle.toLowerCase());
      }).slice(0, this.subtitlesLimit)      
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

    addAudio(lang) {
      let array = this.selectedAudios.filter(item => {
        return item.code === lang.code
      });

      if (!array.length) {
        this.selectedAudios.push(lang)
      }
    },

    addSubtitle(lang) {
      let array = this.selectedSubtitles.filter(item => {
        return item.code === lang.code
      });

      if (!array.length) {
        this.selectedSubtitles.push(lang)
      }
    },

    removeSubtitle(code) {
      let array = this.selectedSubtitles.filter(item => {
        return item.code === code
      });

      if (array.length) {
        this.selectedSubtitles.splice(this.selectedSubtitles.map(item => item.code).indexOf(code), 1)
      }
    },

    removeAudio(code) {
      let array = this.selectedAudios.filter(item => {
        return item.code === code
      });

      if (array.length) {
        this.selectedAudios.splice(this.selectedAudios.map(item => item.code).indexOf(code), 1)
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

    reset() {
      this.years = [1900, 2021];
      this.rating = [0, 10];
      this.selectedGenres = [];
      this.selectedCountries = [];
      this.selectedAudios = [];
      this.selectedSubtitles = [];
      this.genre = '';
      this.country = '';
      this.audio = '';
      this.subtitle = '';

      this.saveQuery(this.defaultQuery)
    },

    search: function() {
      if (this.type.movie !== this.type.series) {
        this.queryData.type = this.type.movie ? 'movie' : 'series';
      } else {
        this.queryData.type = ''
      }

      this.queryData.genre_list = Array.prototype.map.call(this.selectedGenres, item => item.netflixid).toString();
      this.queryData.countrylist = Array.prototype.map.call(this.selectedCountries, item => item.id).toString(); 

      this.queryData.start_year = this.years[0];
      this.queryData.end_year = this.years[1];

      this.queryData.start_rating = this.rating[0];
      this.queryData.end_rating = this.rating[1];

      this.saveQuery(this.queryData)
      console.log(this.queryData)
      this.$emit('search');
      this.$emit('filters', this.count);
      this.close()
    },

    close: function() {
      this.$emit('close');
    },

    async getGenres() {
      this.genres = await mock.fetchGenres();
    },

    async getCountries() {
      this.countries = await mock.fetchCountries();
    },

    async getLangs() {
      this.languages = await mock.fetchLanguages();
    }
  },  
  
  mounted() {
    this.getGenres();
    this.getCountries();
    this.getLangs();
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
