<template>
    <button 
      class="rounded uppercase bg-red font-bold shadow-lg" 
      :class="small ? 'text-sm py-2 px-5' : 'text-lg py-3 px-8'"
    >
      <slot />
    </button>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>