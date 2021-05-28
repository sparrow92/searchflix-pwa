<template>
  <div>
    <!-- <h1 class="mx-8">Ustawienia</h1> -->
    <Heading title="Ustawienia" big />
    <SelectCountry />
    <div class="p-8">
      <!-- <h1 class="text-xl font-bold">Czarna lista</h1> -->
      <Heading title="Czarna lista">
        <Button @click.native="open" small>Dodaj gatunek</Button>
      </Heading>
      <div class="flex items-center gap-3 p-3 bg-opacity-50 bg-gray-700 rounded text-gray-400 font-semibold mb-3">
        <div class="flex-grow">
          <solid-information-circle-icon class="w-5 h-5" />
        </div>
        <p class="block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, id harum corrupti itaque perferendis repudiandae, nisi numquam tempora quo, illo eligendi suscipit recusandae facere nostrum eius. Minus nostrum animi incidunt!</p>        
      </div>


      
      <div class="flex flex-wrap">
        <span class="flex items-center gap-2 rounded-full py-2 px-5 mx-0.5 my-1 text-sm font-semibold bg-white text-gray-800 transition-all duration-200 bg-opacity-80 hover:bg-opacity-100 whitespace-nowrap cursor-pointer" v-for="item in getBlacklist" :key="item.netflixid">
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
