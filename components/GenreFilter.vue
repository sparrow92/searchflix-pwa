<template>
  <div class="px-8 w-full">
    <div class="flex items-center w-full h-16">
      <Loader v-if="!selected" />
      <v-select
        v-else
        class="select-country cursor-pointer w-full max-w-md"
        v-model="selected"
        :options="countries"
        :reduce="country => country.id"
        label="country"
        :clearable="false"
        @option:selected="selectCountry"
      >
        <template v-slot:option="option">
          <country-flag :country="option.countrycode" size="small"/>
          {{ option.country }}
        </template>
      </v-select>      
    </div>

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
  .select-country .vs__search::placeholder,
  .select-country .vs__dropdown-toggle,
  .select-country .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .select-country .vs__clear,
  .select-country .vs__open-indicator {
    fill: #394066;
  }
</style>
