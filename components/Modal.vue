<template>
  <div class="transition-all duration-200 fixed top-0 justify-center ites-start md:items-center z-50 flex w-full h-screen bg-black bg-opacity-60" :class="show ? 'visible opacity-100' : 'invisible opacity-0'">
    <div class="transition-all overflow-scroll transform duration-200 w-screen mx-3 mt-16 md:mt-0 md:mb-0 md:w-96 flex flex-col bg-white rounded-xl shadow-lg" :class="show ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-50'"  v-click-outside="close">
      <div class="relative flex justify-between items-center border-b border-gray-200 p-5">
        <span class="modal__title text-black font-semibold text-lg">
          <slot name="header"/>
        </span>
        <solid-x-icon class="w-7 h-7 text-red cursor-pointer absolute inset-y-0 right-4 m-auto" @click.native="close" />
      </div>
      <div class="modal__body text-black">
        <slot/>
      </div>
    </div>    
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

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
