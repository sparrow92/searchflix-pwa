<template>
  <div class="flex flex-col justify-center items-center w-full h-full opacity-20 my-24 mx-auto gap-5">
    <component :is="`solid-${icon}-icon`" class="w-32 h-32 text-gray-500" />
    <span class="text-3xl font-semibold text-center">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => 'Brak danych'      
    },

    icon: {
      type: String,
      default: () => 'x-circle'
    }
  }
}
</script>