<template>
  <span class="badge" :class="[type === 'add' ? 'bg-white text-gray-800' : 'bg-red text-white', small ? 'py-1 px-2.5 text-xs': 'py-2 px-5 text-sm']">
    <slot />
    <solid-x-icon v-if="type === 'remove'" @click.native="action" class="ml-2 w-3 h-3 cursor-pointer" />
    <solid-plus-icon v-if="type === 'add'" @click.native="action" class="ml-2 w-4 h-4 cursor-pointer" />
  </span>    
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => 'remove'
    },

    small: {
      type: Boolean,
      default: () => false
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
  @apply flex items-center rounded-full  mx-0.5 my-1 font-semibold transition-all duration-200 bg-opacity-80 hover:bg-opacity-100 xs:whitespace-nowrap cursor-pointer;
}
</style>
