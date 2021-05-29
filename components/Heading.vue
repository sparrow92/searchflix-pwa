<template>
  <div :class="big ? 'w-screen md:bg-gradient-to-r from-red-900 via-red-500 to-red-900 shadow-inner mb-5' : 'w-full'">
    <div class="flex justify-between items-center py-2" :class="[{ 'px-8 py-4 h-20': big }]">
      <h1 :class="['mb-0', { 'text-2xl font-semibold uppercase py-2': !big }]">{{ title }}</h1>
      <div class="heading__additional">
        <slot />      
      </div>
    </div>
    <div v-if="!big && border" class="bg-gradient-to-r from-gray-700 via-gray-700 to-transparent h-px mb-8"></div> 
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
    },

    border: {
      type: Boolean,
      default: () => true
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
.heading {
  &__additional {
    @apply hidden md:block max-w-3xl font-semibold text-sm text-right;
  }
}
</style>
