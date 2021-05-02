<template>
  <Modal :show="show" @close="close">
      
      <template v-slot:header>
        Szukania zaawansowane
      </template>

      <div class="mb-2">
        <label for="name">Nazwa: </label>
        <input v-model="queryData.name" type="text" id="name" name="name" />
      </div>

      <div class="mb-2">
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
      </div>

      <Button @click.native="search">Szukaj</Button>

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
    ])
  },

  methods: {
    ...mapActions([
      'saveQuery'
    ]),

    search: function() {
      this.saveQuery(this.queryData)
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
</style>
