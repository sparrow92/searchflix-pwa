<template>
  <div>
    <Heading title="Ustawienia" class="mb-5" big>
      <span>Poniższe ustawienia będą mogły zostać wzięte pod uwagę przy wyszukiwaniu filmów.</span>
    </Heading>
    <Heading title="Wybierz swój kraj" class="px-8" />
    <SelectCountry />

    <Heading title="Wybierz domyślny język" class="px-8" />
    <SelectLanguage />
    <!-- <div class="p-8 w-full">
      <Heading title="Czarna lista">
        <Button @click.native="open" icon="adjustments" type="light" class="mr-2" small>Modyfikuj</Button>     
      </Heading>
            
      <div class="flex flex-wrap">
        <Badge v-for="item in getBlacklist" :key="item.netflixid" @action="removeGenre(item.netflixid)">{{ item.genre }}</Badge>
      </div>
    </div> -->
    
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
