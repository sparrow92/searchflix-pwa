<template>
  <Modal :show="show" @close="close">      
    <template v-slot:header>
      Czarna lista
    </template>

    <div class="flex justify-between items-start gap-2">
      <v-select 
        class="select-genres cursor-pointer flex-grow-1 w-full"
        v-model="selected"
        :options="genres"
        label="genre"
      >
        <template v-slot:option="option">
          {{ option.genre }}
        </template>
      </v-select>
      <Button @click.native="selectGenres" small>Dodaj</Button> 
    </div>
    <div>
      <span class="block" v-for="item in getBlacklist" :key="item.netflixid" @click="removeGenre(item.netflixid)">{{ item.genre }}</span>
    </div>
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

  data() {
    return {
      selected: null,
      genres: []
    }
  },

  computed: {
    ...mapGetters([
      'getBlacklist'
    ])
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
