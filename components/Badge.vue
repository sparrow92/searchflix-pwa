<template>
  <span class="badge" :class="type === 'add' ? 'bg-white text-gray-800' : 'bg-red text-white'">
    <slot />
    <solid-x-icon v-if="type === 'remove'" @click.native="action" class="w-3 h-3 cursor-pointer" />
    <solid-plus-icon v-if="type === 'add'" @click.native="action" class="w-4 h-4 cursor-pointer" />
  </span>    
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => 'remove'
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
    action: function () {
      this.$emit('action');
    },
  }
}
</script>

<style lang="postcss" scoped>
.badge {
  @apply flex items-center gap-2 rounded-full py-2 px-5 mx-0.5 my-1 text-sm font-semibold transition-all duration-200 bg-opacity-80 hover:bg-opacity-100 xs:whitespace-nowrap cursor-pointer;
}
</style>
