<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
    <Logo />
    <SelectCountry />
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
