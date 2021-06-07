<template>
  <div class="px-8 w-full">
    <div class="flex items-center w-full h-16">
      <Loader v-if="selected === ''" />
      <v-select
        v-else
        class="select-language cursor-pointer w-full max-w-md"
        v-model="selected"
        :options="languages"
        :reduce="lang => lang.code"
        label="name"
        :clearable="true"
        placeholder="Nie wybrano..."
        @option:selected="selectLang"
      >
        <template v-slot:option="option">
          {{ option.name }}
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
      selected: '',
      languages: []
    }
  },

  watch: {
    selected (value) {
      if (!value) {
        this.removeLang();
      }
    }
  },

  computed: {
    ...mapGetters([
      'selectedLang'
    ]),

    filtered() {
      return this.languages.filter(lang => {
        return lang.code == this.selectedLang;
      })
    }
  },

  methods: {
    ...mapActions([
      'updateLang',
      'removeLang'
    ]),

    selectLang() {
      this.updateLang(this.selected)        
    }
  },

  async mounted() {
    this.languages = await mock.fetchLanguages();
    this.selected = this.filtered;
  }
}
</script>

<style lang="postcss">
  .select-language .vs__search::placeholder,
  .select-language .vs__dropdown-toggle,
  .select-language .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    font-variant: normal;
  }

  .select-language .vs__search::placeholder {
    opacity: 0.6;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .select-language .vs__clear,
  .select-language .vs__open-indicator {
    fill: #394066;
  }
</style>
