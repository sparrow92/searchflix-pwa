<template>
  <Modal :show="show" @close="close" type="search">
      
      <template v-slot:header>
        <div class="flex items-center gap-3">
          <span>Filtry wyszukiwania</span>
          <span v-if="counter" class="rounded-full font-semibold flex items-center justify-center text-sm bg-gradient-to-b from-red to-red-900 w-7 h-7">10</span>
        </div>
      </template>

      <div class="filters flex flex-wrap w-full">
        <div class="w-full">
          <Heading title="Gatunki" />
          <Toggle :checked="true" />
        </div>

        <div class="w-full">
          <Heading title="Kraje" />
        </div>

        <div class="w-full">
          <Heading title="Rok produkcji" />
        </div>

        <div class="w-full md:w-1/2">
          <Heading title="Typ" />
        </div>

        <div class="w-full md:w-1/2">
          <Heading title="Oceny" />
        </div>
      </div>

      <!-- <div class="mb-2">
        <label for="genre">Gatunek: </label>
        <input v-model="queryData.genre_list" type="text" id="genre" name="genre" />
      </div>

      <div class="mb-2">
        <label for="type">Typ: </label>
        <input v-model="queryData.type" type="text" id="type" name="type" />
      </div>

      <div class="mb-2">
        <label for="start_year">Od roku: </label>
        <input v-model="queryData.start_year" type="text" id="start_year" name="start_year" />
      </div>

      <div class="mb-2">
        <label for="end_year">Do roku: </label>
        <input v-model="queryData.end_year" type="text" id="end_year" name="end_year" />
      </div>

      <div class="mb-2">
        <label for="audiosubtitle">Napisy, audio: </label>
        <input v-model="queryData.audiosubtitle_andor" type="text" id="audiosubtitle" name="audiosubtitle" />
      </div>

      <div class="mb-2">
        <label for="start_rating">Oceny od: </label>
        <input v-model="queryData.start_rating" type="text" id="start_rating" name="start_rating" />
      </div>

      <div class="mb-2">
        <label for="end_rating">Oceny do: </label>
        <input v-model="queryData.end_rating" type="text" id="end_rating" name="end_rating" />
      </div>

      <div class="mb-2">
        <label for="subtitle">Napisy: </label>
        <input v-model="queryData.subtitle" type="text" id="subtitle" name="subtitle" />
      </div>

      <div class="mb-2">
        <label for="audio">Lektor: </label>
        <input v-model="queryData.audio" type="text" id="audio" name="audio" />
      </div>

      <div class="mb-2">
        <label for="countrylist">Kraje: </label>
        <input v-model="queryData.countrylist" type="text" id="countrylist" name="countrylist" />
      </div> -->

      <template v-slot:footer>
        <div class="flex gap-3">
        <Button @click.native="reset" icon="refresh" type="light">Resetuj</Button>
        <Button @click.native="search" icon="adjustments">Zastosuj</Button>          
        </div>

      </template>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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

<style lang="postcss">
input {
  @apply text-black;
}

.filters {
  & > div {
    @apply p-1.5;
  }
}
</style>
