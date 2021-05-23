<template>
  <Modal :show="show" @close="close" type="blacklist">      
    <template v-slot:header>
      Czarna lista
    </template>

    <div class="flex justify-between items-start gap-2 mb-5">
      <v-select 
        class="select-genres cursor-pointer w-full"
        v-model="selected"
        :options="filteredGenres"
        label="genre"
      >
        <template v-slot:option="option">
          {{ option.genre }}
        </template>
      </v-select>
    </div>
    <div v-if="getBlacklist.length">
      <div class="block py-5 border-gray-800 flex justify-between items-center" :class="(index == 0) ? 'border-t-0' : 'border-t'" v-for="(item, index) in getBlacklist" :key="item.netflixid">
        <span class="">{{ item.genre }}</span>
        <outline-trash-icon class="w-7 h-7 cursor-pointer text-red" @click.native="removeGenre(item.netflixid)" />
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center text-gray-800 my-32">
      <outline-trash-icon class="w-10 h-10" />
      <span class="font-bold text-2xl">Brak elementów</span>
    </div>      

    <template v-slot:footer>
      <Button @click.native="close">Zamknij</Button>
    </template>

  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mock from '@/api/mock/index'

export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },

  watch: {
    selected(val) {
      if (val) {
        this.selectGenres();
      }
    }
  },

  data() {
    return {
      selected: null,
      genres: []
    }
  },

  computed: {
    ...mapGetters([
      'getBlacklist'
    ]),

    filteredGenres() {
      return this._.differenceWith(this.genres, this.getBlacklist, function(o1, o2) {
        return o1['netflixid'] === o2['netflixid']
      })
    }
  },

  methods: {
    ...mapActions([
      'addGenre',
      'removeGenre'
    ]),

    selectGenres() {
      this.addGenre(this.selected)
    },

    close: function() {
      this.$emit('close');
    },
  },

  async mounted() {
    this.genres = await mock.fetchGenres();
    this.selected = this.filtered;
  }
}
</script>

<style lang="postcss">
  .select-genres .vs__search::placeholder,
  .select-genres .vs__dropdown-toggle,
  .select-genres .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .select-genres .vs__clear,
  .select-genres .vs__open-indicator {
    fill: #394066;
  }

  .select-genres .vs__selected {
    margin: 0 2px;
  }

</style>
