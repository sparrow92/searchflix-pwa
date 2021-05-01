<template>
  <div>
    <h1 class="mx-8">Ustawienia</h1>
    <SelectCountry />
    <p class="px-8">
      <Button @click.native="open">Blacklist</Button>
    </p>
    
    <Blacklist :show="showBlacklist" @close="close" />
    <p class="mx-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellendus totam obcaecati, non ex sint molestiae numquam distinctio, dignissimos odit eaque cumque voluptates facere esse? Cupiditate eaque laborum alias repellendus?
    </p>
  </div>
</template>

<script>
export default {
  layout: 'app',

  data() {
    return {
      showBlacklist: false
    }
  },

  methods: {
    open() {
      this.showBlacklist = true
    },

    close() {
      this.showBlacklist = false
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
