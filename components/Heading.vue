<template>
  <div :class="big ? 'w-screen' : 'w-full'">
    <div class="flex justify-between items-center py-2" :class="[{ 'px-8': big }]">
      <h1 :class="{ 'text-xl font-bold mb-0': !big }">{{ title }}</h1>
      <div>
        <slot />      
      </div>
    </div>
    <div class="bg-gradient-to-r from-gray-500 via-gray-800 to-transparent mb-5" :class="big ? 'h-0.5' : 'h-px'"></div> 
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
