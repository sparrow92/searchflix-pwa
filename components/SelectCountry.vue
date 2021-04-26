<template>
  <div class="mx-8">
    <h1 class="text-xl font-bold">Wybierz swój kraj:</h1>
    <v-select 
      class="style-chooser cursor-pointer"
      v-model="selected"
      :options="countries"
      :reduce="country => country.id"
      label="country"
      @option:selected="selectCountry"
    >
      <template v-slot:option="option">
        <country-flag :country="option.countrycode" size="small"/>
        {{ option.country }}
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mock from '@/api/mock/index'

export default {
  data() {
    return {
      selected: null,
      countries: []
    }
  },

  computed: {
    ...mapGetters([
      'selectedCountry'
    ]),

    filtered() {
      return this.countries.filter(country => {
        return country.id == this.selectedCountry;
      })
    }
  },

  methods: {
    ...mapActions([
      'updateCountry'
    ]),

    selectCountry() {
      this.updateCountry(this.selected)
    }
  },

  async mounted() {
    this.countries = await mock.fetchCountries();
    this.selected = this.filtered;
  }
}
</script>

<style lang="postcss">
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
</style>
