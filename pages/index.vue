<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
    <Logo />
    <h1 class="text-xl font-bold">Wybierz swój kraj:</h1>
    <button class="mt-5 rounded uppercase py-3 px-8 bg-red text-xl font-bold shadow-lg" @click="$router.push('/app')">Przejdź dalej</button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>

</style>
