<template>
  <span class="flex items-center gap-2 rounded-full py-2 px-5 mx-0.5 my-1 text-sm font-semibold bg-white text-gray-800 transition-all duration-200 bg-opacity-80 hover:bg-opacity-100 xs:whitespace-nowrap cursor-pointer">
    <slot />
    <solid-x-icon @click.native="remove" class="w-3 h-3 cursor-pointer" />
  </span>    
</template>

<script>
export default {
  props: {

  },

  data() {
    return {
      backgroundImage: ''
    }
  },

  computed: {

  },

  methods: {
    remove: function () {
      this.$emit('remove');
    },
  }
}
</script>

<style lang="postcss" scoped>

</style>
