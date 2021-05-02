<template>
  <div>
    <h1 class="mx-8">Szukaj</h1>
    <p class="mx-8">      

      <span class="query" v-if="getQuery.name">
        <span class="title">Nazwa:</span>
        <span>{{ getQuery.name }}</span>
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

      <Button @click.native="open">Zaawansowane</Button>
    </p>
    
    <SearchQuery :show="showSearch" @close="close" /> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',

  data() {
    return {
      showSearch: false
    }
  },

  computed: {
    ...mapGetters([
      'getQuery'
    ])
  },

  methods: {
    close: function() {
      this.showSearch = false;
    },

    open: function() {
      this.showSearch = true;
    }
  }
}
</script>

<style lang="postcss" scoped>
.query {
  @apply block;
}
</style>
