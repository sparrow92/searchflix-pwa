<template>
  <div>
    <h1 class="mx-8">Ustawienia</h1>
    <SelectCountry />
    <p class="p-8">
      <Button @click.native="open">Blacklist</Button>
      <span class="block" v-for="item in getBlacklist" :key="item.netflixid" @click="removeGenre(item.netflixid)">{{ item.genre }}</span>
    </p>
    
    <Blacklist :show="showBlacklist" @close="close" />
    <p class="mx-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellendus totam obcaecati, non ex sint molestiae numquam distinctio, dignissimos odit eaque cumque voluptates facere esse? Cupiditate eaque laborum alias repellendus?
    </p>
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
