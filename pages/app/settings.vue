<template>
  <div>
    <h1 class="mx-8">Ustawienia</h1>
    <SelectCountry />
    <p class="p-8">
      <Button @click.native="open">Blacklist</Button>
      <span class="block" v-for="item in getBlacklist" :key="item.netflixid" @click="removeGenre(item.netflixid)">{{ item.genre }}</span>
    </p>
    
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
