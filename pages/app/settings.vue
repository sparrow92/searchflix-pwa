<template>
  <div>
    <Heading title="Ustawienia" class="mb-5" big>
      <span>Poniższe ustawienia będą mogły zostać wzięte pod uwagę przy wyszukiwaniu filmów.</span>
    </Heading>
    <SelectCountry />
    <div class="p-8">
      <Heading title="Czarna lista">
        <Button @click.native="open" icon="plus" small>Dodaj gatunek</Button>
      </Heading>
            
      <div class="flex flex-wrap">
        <span class="flex items-center gap-2 rounded-full py-2 px-5 mx-0.5 my-1 text-sm font-semibold bg-white text-gray-800 transition-all duration-200 bg-opacity-80 hover:bg-opacity-100 xs:whitespace-nowrap cursor-pointer" v-for="item in getBlacklist" :key="item.netflixid">
          {{ item.genre }}
          <solid-x-icon @click.native="removeGenre(item.netflixid)" class="w-3 h-3 cursor-pointer" />
        </span>        
      </div>

    </div>
    
    <Blacklist :show="showBlacklist" @close="close" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'app',

  data() {
    return {
      showBlacklist: false
    }
  },

  computed: {
    ...mapGetters([
      'getBlacklist'
    ])
  },

  methods: {
    ...mapActions([
      'removeGenre'
    ]),

    open() {
      this.showBlacklist = true
    },

    close() {
      this.showBlacklist = false
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
