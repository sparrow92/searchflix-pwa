<template>
  <div>
    <h1 class="mx-8">Ustawienia</h1>
    <SelectCountry />
    <div class="p-8">
      <h1 class="text-xl font-bold">Czarna lista</h1>
      <div class="flex items-center gap-3 p-3 bg-opacity-50 bg-gray-700 rounded text-gray-400 font-semibold mb-3">
        <div class="flex-grow">
          <solid-information-circle-icon class="w-5 h-5" />
        </div>
        <p class="block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, id harum corrupti itaque perferendis repudiandae, nisi numquam tempora quo, illo eligendi suscipit recusandae facere nostrum eius. Minus nostrum animi incidunt!</p>        
      </div>


      <Button @click.native="open">Blacklist</Button>
      <span class="block" v-for="item in getBlacklist" :key="item.netflixid" @click="removeGenre(item.netflixid)">{{ item.genre }}</span>
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
