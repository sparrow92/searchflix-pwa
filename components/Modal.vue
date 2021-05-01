<template>
  <div class="transition-all duration-200 fixed top-0 justify-center ites-start md:items-center z-50 flex w-full h-screen bg-black bg-opacity-60" :class="show ? 'visible opacity-100' : 'invisible opacity-0'">
    <div 
      class="transition-all overflow-scroll transform duration-200 w-screen mx-3 mt-16 md:mt-0 md:mb-0 md:w-96 flex flex-col bg-gray-900 rounded shadow-lg" 
      :class="show ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-50'"  v-click-outside="close"
    >
      <Loader v-if="loading" />      
      <div
        :style="[(background && !loading) ? bgStyle : defaultStyle]"
        class="relative w-full flex justify-between items-center p-5"
        :class="{'border-b border-gray-800': !loading}"
      >
        <span class="modal__title font-semibold text-lg" v-if="!loading">
          <slot name="header"/>
        </span>
        <solid-x-icon class="w-7 h-7 text-red cursor-pointer absolute right-4 m-auto" :class="background ? 'top-4' : 'inset-y-0'" @click.native="close" />
      </div>

      <div class="modal__body" v-if="!loading">
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
    },

    loading: {
      type: Boolean,
      default: () => false
    },

    background: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      backgroundImage: '',
      defaultStyle: {
      }
    }
  },

  watch: {
    background (value) {
      if (value) {
        this.backgroundImage = value;
      }
    }
  },

  computed: {
    bgStyle() {
      return {
        paddingTop: '56%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
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
.modal {
  &__body {
    @apply p-5;
  }
}
</style>