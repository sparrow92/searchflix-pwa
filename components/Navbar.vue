<template>
  <div class="fixed flex justify-around items-center bottom-0 w-screen h-16 bg-black dark:bg-gray-700 shadow-lg border-t border-gray-900 dark:border-gray-600 z-40">
    
    <div >
      <NuxtLink class="flex flex-col items-center text-gray-300" to="/app">
        <solid-fire-icon class="w-7 h-7" />
        <span class="text-xs font-bold">Główna</span>
      </NuxtLink>    
    </div>

    <div>
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/search') }" class="flex flex-col items-center text-gray-300" to="/app/search">
        <solid-search-icon class="w-7 h-7" />
        <span class="text-xs font-bold">Szukaj</span>
      </NuxtLink>    
    </div>

    <div>
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/favorites') }" class="flex flex-col items-center text-gray-300" to="/app/favorites">
        <outline-clock-icon class="w-7 h-7" />
        <span class="text-xs font-bold">Playlista</span>
      </NuxtLink>    
    </div>

    <div>
      <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/database') }" class="flex flex-col items-center text-gray-300" to="/app/database">
        <solid-cog-icon class="w-7 h-7" />
        <span class="text-xs font-bold">Ustawienia</span>
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
  a {
    -webkit-tap-highlight-color: transparent;
  }

  a.nuxt-link-exact-active {
    @apply text-red !important;

    & span {
      @apply text-gray-300;
    }
  }
</style>
