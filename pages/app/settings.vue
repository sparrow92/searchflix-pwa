<template>
  <div>
    <Heading title="Ustawienia" class="mb-5" big>
      <span>Poniższe ustawienia będą mogły zostać wzięte pod uwagę przy wyszukiwaniu filmów.</span>
    </Heading>
    <Heading title="Wybierz swój kraj" class="px-8" />
    <SelectCountry />
    <div class="p-8">
      <Heading title="Czarna lista">
        <Button @click.native="open" icon="plus" small>Dodaj gatunek</Button>
      </Heading>
            
      <div class="flex flex-wrap">
        <Badge v-for="item in getBlacklist" :key="item.netflixid" @action="removeGenre(item.netflixid)">{{ item.genre }}</Badge>
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
