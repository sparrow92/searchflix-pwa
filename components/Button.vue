<template>
    <button :class="[small ? 'text-sm py-2 px-5 gap-2' : 'text-lg py-2 px-8 gap-3', `btn btn--${type}`]">
      <component v-if="icon" :is="`solid-${icon}-icon`" :class="small ? 'w-5 h-5' : 'w-6 h-6'" />
      <slot />
    </button>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: () => false
    },

    icon: {
      type: String,
      default: () => ''      
    },

    type: {
      type: String,
      default: () => 'default'     
    }
  }
}
</script>

<style lang="postcss">
.btn {
  @apply rounded-full flex items-center font-semibold shadow-lg transition-all duration-300;

  &--default {
    @apply bg-red text-white hover:bg-red-800;
  }

  &--light {
    @apply bg-white text-gray-800 hover:bg-gray-300;
  }
}
</style>