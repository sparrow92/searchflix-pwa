<template>
  <div 
    class="modal__overlay transition-all duration-200 px-3 py-10 fixed top-0 justify-center ites-start md:items-center z-50 flex w-full min-h-screen overflow-y-auto bg-black bg-opacity-60" 
    :class="[show ? 'visible opacity-100' : 'invisible opacity-0', type]" 
    v-body-scroll-lock="show"
  >
    <div 
      class="transition-all absolute top-10 mb-10 transform duration-300 inset-x-3 md:mx-auto md:w-184 min-h-modal flex flex-col rounded shadow-lg" 
      :class="[show ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-50']"
      v-click-outside="vcoConfig"
    >
          
      <div
        :style="[(background && !loading) ? bgStyle : defaultStyle]"
        class="relative w-full flex justify-between items-center p-5 rounded-t bg-gray-900"
        :class="{'border-b border-gray-800 h-16': !background}"
      >
        <span class="modal__title font-bold text-xl z-50" v-if="!loading">
          <slot name="header"/>
        </span>
        <solid-x-icon class="w-7 h-7 p-1 rounded-full bg-gray-900 bg-opacity-60 text-white cursor-pointer absolute right-5 m-auto" :class="background ? 'top-5' : 'top-5'" @click.native="close" />
        <div v-if="background" class="absolute bottom-0 inset-x-0 z-10 h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>


      <div v-if="loading" class="bg-gray-900 absolute inset-0 rounded">
        <Loader />  
      </div>
      <div v-else class="modal__body flex-grow bg-gray-900" :class="hasFooter ? 'rounded-b-0' : 'rounded-b mb-10'">
        <slot/>
      </div>

      <div v-if="hasFooter" class="modal__footer border-t border-gray-800 p-5 rounded-b flex justify-end bg-gray-900 mb-10">
        <slot name="footer"/>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
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
    },

    type: {
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
        isActive: true
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
    },

    hasFooter() {
      return !!this.$slots.footer
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
      return event.target.className.includes(this.type)
    }
  },

  created() {

  }
}
</script>

<style lang="postcss">
.modal {
  &__body {
    @apply relative p-5;
  }
}
</style>
