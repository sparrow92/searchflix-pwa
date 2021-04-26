<template>
  <div class="flex flex-col items-start justify-center py-8">
    <h1 class="mx-8">Szukaj</h1>
    <p class="mx-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellendus totam obcaecati, non ex sint molestiae numquam distinctio, dignissimos odit eaque cumque voluptates facere esse? Cupiditate eaque laborum alias repellendus?
    </p>
    <button @click="open">Wyszukiwanie zaawansowane</button>
    <SearchQuery :show="showSearch" @close="close" /> 
  </div>
</template>

<script>
export default {
  layout: 'app',

  data() {
    return {
      showSearch: false
    }
  },

  computed: {

  },

  methods: {
    close: function() {
      this.showSearch = false;
    },

    open: function() {
      this.showSearch = true;
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
