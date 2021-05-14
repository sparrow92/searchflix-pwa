<template>
  <div 
    class="modal__overlay transition-all duration-200 fixed top-0 justify-center ites-start md:items-center z-50 flex w-full min-h-screen overflow-y-scroll bg-black bg-opacity-60" 
    :class="show ? 'visible opacity-100' : 'invisible opacity-0'" 
    v-body-scroll-lock="show"
  >
    <div 
      class="transition-all absolute top-10 mb-10 transform duration-300 mx-3 md:mt-0 md:mb-0 w-96 flex flex-col bg-gray-900 rounded shadow-lg" 
      :class="[show ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-50', loading ? 'h-72' : 'h-auto']"
      v-click-outside="vcoConfig"
    >
      <Loader v-if="loading" />      
      <div
        :style="[(background && !loading) ? bgStyle : defaultStyle]"
        class="relative w-full flex justify-between items-center p-5 rounded-t"
        :class="{'border-b border-gray-800 h-16': !background}"
      >
        <span class="modal__title font-semibold text-lg z-50" v-if="!loading">
          <slot name="header"/>
        </span>
        <solid-x-icon class="w-7 h-7 p-1 rounded-full bg-gray-900 bg-opacity-60 text-white cursor-pointer absolute right-5 m-auto" :class="background ? 'top-5' : 'top-5'" @click.native="close" />
        <div v-if="background" class="absolute bottom-0 inset-x-0 z-10 h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
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
  // directives: {
  //   clickOutside: vClickOutside.directive
  // },

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
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        isActive: false
      },
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

    handler() {
      this.close()
    },
    
    middleware(event) {
      return event.target.className.includes('modal__overlay')
    }
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
