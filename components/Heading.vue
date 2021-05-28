<template>
  <div :class="big ? 'w-screen' : 'w-full'">
    <div class="flex justify-between items-center py-2" :class="[{ 'px-8': big }]">
      <h1 :class="{ 'text-xl font-bold mb-0': !big }">{{ title }}</h1>
      <div>
        <slot />      
      </div>
    </div>
    <div class="bg-gradient-to-r mb-5" :class="big ? 'from-red-800 via-red to-transparent h-0.5' : 'from-gray-500 via-gray-600 to-transparent h-px'"></div> 
  </div>

</template>

<script>
export default {
  props: {
    big: {
      type: Boolean,
      default: () => false
    },

    title: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      backgroundImage: ''
    }
  },

  computed: {

  },

  methods: {

  }
}
</script>

<style lang="postcss" scoped>

</style>
