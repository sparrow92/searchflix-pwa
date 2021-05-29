<template>
  <div>
    <!-- <h1 class="mx-8">Ustawienia</h1> -->
    <Heading title="Ustawienia" big>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet minima reprehenderit dicta, consectetur ipsa perferendis asperiores velit voluptatibus ipsam eos saepe blanditiis commodi rerum iusto animi quis natus enim tenetur!
      </span>
    </Heading>
    <SelectCountry />
    <div class="p-8">
      <!-- <h1 class="text-xl font-bold">Czarna lista</h1> -->
      <Heading title="Czarna lista">
        <Button @click.native="open" icon="plus" small>Dodaj gatunek</Button>
      </Heading>
            
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
