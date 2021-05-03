<template>
  <div class="z-10 relative h-screen">
    <div class="fixed z-10 inset-0 bg-searchflix bg-fixed bg-cover"></div>
    <div class="fixed z-20 inset-0 bg-black bg-opacity-90"></div>
    <div class="absolute inset-0 z-30">
      <Nuxt class="flex flex-col items-start justify-center pt-8 pb-16" />
      <Navbar />         
    </div>
    
  </div>
</template>

<script>
export default {
  middleware: 'app'
}
</script>

<style lang="postcss" scoped>

</style>
