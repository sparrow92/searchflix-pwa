<template>
  <div class="background bg-cover relative w-screen h-screen">
    <Nuxt class="z-20" />
    <div class="absolute z-10 inset-0 bg-gray-900 bg-opacity-80"></div>
  </div>
</template>

<style lang="postcss" scoped>
  .background {
    background-image: url(assets/images/background.jpg);
  }
</style>
