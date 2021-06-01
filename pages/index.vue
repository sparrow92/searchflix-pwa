<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center p-8 max-w-xl mx-auto">
    <Logo />
    <h2 class="uppercase text-2xl mt-16">Wybierz swój kraj</h2>
    <SelectCountry class="mb-16" :border="false" />
    <Button @click.native="$router.push('/app')">Przejdź dalej</Button>
  </div>
</template>

<script>

export default {
  methods: {
  },

  mounted() {
  }
}
</script>

<style lang="postcss" scoped>

</style>
