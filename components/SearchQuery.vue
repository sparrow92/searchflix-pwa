<template>
  <Modal :show="show" @close="close">
      
      <template v-slot:header>
        Szukania zaawansowane
      </template>

      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium eaque quos voluptatem et dolore error atque, consequatur ab temporibus minima cumque molestiae sit alias obcaecati eveniet recusandae corporis quis ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium eaque quos voluptatem et dolore error atque, consequatur ab temporibus minima cumque molestiae sit alias obcaecati eveniet recusandae corporis quis ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium eaque quos voluptatem et dolore error atque, consequatur ab temporibus minima cumque molestiae sit alias obcaecati eveniet recusandae corporis quis ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium eaque quos voluptatem et dolore error atque, consequatur ab temporibus minima cumque molestiae sit alias obcaecati eveniet recusandae corporis quis ad!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium eaque quos voluptatem et dolore error atque, consequatur ab temporibus minima cumque molestiae sit alias obcaecati eveniet recusandae corporis quis ad!
        </p>
      </div>

  </Modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {

    }
  },

  computed: {

  },

  methods: {
    close: function() {
      this.$emit('close');
    },
  },

  created() {

  }
}
</script>

<style lang="postcss">

</style>
