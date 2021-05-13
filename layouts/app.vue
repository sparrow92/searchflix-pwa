<template>
  <div class="z-10 relative h-screen w-full">
    <div class="fixed z-10 inset-0 bg-searchflix bg-fixed bg-cover"></div>
    <div class="fixed z-20 inset-0 bg-black bg-opacity-90"></div>
    <div class="relative w-full z-30">
      <Nuxt class="flex flex-col items-start justify-center pt-8 pb-16 md:pt-20 md:pb-8" />
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
