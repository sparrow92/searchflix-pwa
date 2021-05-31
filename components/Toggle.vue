<template>
  <div class="flex gap-3 items-center cursor-pointer">
    <toggle-button 
      v-model="switched"
      :css-colors="true"
      :width="35"
      :margin="2"
      :sync="true"
    />  
    <span v-if="name" class="text-lg">
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: {
      type: Boolean,
      default: () => false
    },

    name: {
      type: String,
      default: () => ''
    }
  },

  computed: {
    switched: {
      get() {
        return this.checked
      },

      set(value) {
        return false
      } 
    }
  }
}
</script>

<style lang="postcss">
.v-switch-core {
  @apply border box-content !important;
}

.vue-js-switch {
  @apply pointer-events-none !important;

  .v-switch-core {
    @apply border-gray-500 !important;
  }
  .v-switch-button {
    @apply bg-gray-500 !important;
  }

  &.toggled {
    .v-switch-core {
      @apply border-red !important;
    }
    .v-switch-button {
      @apply bg-red !important;
    }
  }
}
</style>