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
        <input type="text" placeholder="Wpisz gatunek..." class="form__input small">
        <div class="flex flex-wrap mt-4">
          <Badge v-for="(item, index) in ['Horror', 'Porno', 'Thriller']" :key="index" type="add">{{ item }}</Badge>
        </div>   
        <div class="flex flex-wrap mt-2">
          <Badge v-for="(item, index) in ['Horror', 'Porno', 'Thriller']" :key="index">{{ item }}</Badge>
        </div>   
      </div>

      <div class="section col-span-2">
        <input type="text" placeholder="Wpisz kraj produkcji..." class="form__input small">
        <div class="flex flex-wrap mt-4">
          <Badge v-for="(item, index) in ['Polska', 'Colombia', 'Puerto Rico']" :key="index" type="add">{{ item }}</Badge>
        </div>  
        <div class="flex flex-wrap mt-2">
          <Badge v-for="(item, index) in ['Polska', 'Colombia', 'Puerto Rico']" :key="index">{{ item }}</Badge>
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
        <Button @click.native="reset" icon="refresh" type="light">Resetuj</Button>
        <Button @click.native="search" icon="adjustments">Zastosuj</Button>          
      </div>
    </template>
  </Modal>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'
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
      years: [1900, 2021],
      rating: [0, 10],
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

    counter() {
      return 15
    }
  },

  methods: {
    ...mapActions([
      'saveQuery'
    ]),

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
  }
}
</script>

<style src="@vueform\slider\themes\default.css"></style>
<style lang="postcss">
input {
  @apply text-black;
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
