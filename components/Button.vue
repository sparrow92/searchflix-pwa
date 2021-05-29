<template>
    <button :class="[small ? 'text-sm py-2 px-5 gap-2' : 'text-lg py-2 px-8 gap-3', { 'btn--counter': count }, `btn btn--${type}`]">
      <component v-if="icon" :is="`solid-${icon}-icon`" :class="small ? 'w-5 h-5' : 'w-6 h-6'" />
      <slot />
      <div v-if="count" class="counter"> 
        {{ count }}
      </div>
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
    },

    count: {
      type: Number,
      default: () => 0     
    }
  }
}
</script>

<style lang="postcss">
.btn {
  @apply rounded-full flex items-center font-semibold shadow-lg transition-all duration-500;

  & > .counter {
    @apply flex justify-center items-center rounded-full text-xs text-white h-5 w-5;
  }

  &--default {
    @apply bg-gradient-to-b from-red to-red-900 text-white;
    @apply hover:from-red-700 hover:to-red-900;
  }

  &--light {
    @apply bg-white text-gray-800 hover:bg-gray-300;
  }

  &--counter {
    @apply text-red;

    & > .counter {
      @apply bg-red;
    }
  }

}
</style>