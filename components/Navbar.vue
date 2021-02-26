<template>
  <div class="fixed flex justify-around items-center bottom-0 w-screen h-16 bg-white dark:bg-gray-700 shadow-lg border-t border-gray-200 dark:border-gray-600">
    
    <div class="w-1/4">
      <NuxtLink class="flex flex-col items-center text-gray-400" to="/app">
        <solid-home-icon class="w-7 h-7" />
      </NuxtLink>    
    </div>

    <div class="w-1/4">
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/database') }" class="flex flex-col items-center text-gray-400" to="/app/database">
        <solid-film-icon class="w-7 h-7" />
      </NuxtLink>    
    </div>

    <div class="w-1/4">
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/search') }" class="flex flex-col items-center text-gray-400" to="/app/search">
        <solid-search-icon class="w-7 h-7" />
      </NuxtLink>    
    </div>

    <div class="w-1/4">
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/favorites') }" class="flex flex-col items-center text-gray-400" to="/app/favorites">
        <solid-heart-icon class="w-7 h-7" />
      </NuxtLink>    
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isRouteActive(path) {
      if (this.$route.path.includes(path)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="postcss">
  a.nuxt-link-exact-active {
    @apply text-red-600 !important;
  }
</style>
