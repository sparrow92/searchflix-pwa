<template>
  <div class="fixed flex md:justify-between items-center bottom-0 md:top-0 w-full h-16 md:px-8 bg-black dark:bg-gray-700 shadow-lg border-t border-gray-900 dark:border-gray-600 z-40">
    
    <Logo class="hidden md:flex h-10 mr-auto" />

    <div class="flex justify-around items-center h-full w-full md:w-auto md:gap-10">
      <div>
        <NuxtLink class="flex flex-col items-center text-gray-300" to="/app">
          <solid-fire-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Główna</span>
        </NuxtLink>    
      </div>

      <div>
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/search') }" class="flex flex-col items-center text-gray-300" to="/app/search">
          <solid-search-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Szukaj</span>
        </NuxtLink>    
      </div>

      <div>
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/playlist') }" class="flex flex-col items-center text-gray-300" to="/app/playlist">
          <outline-clock-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Playlista</span>
        </NuxtLink>    
      </div>

      <div>
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/settings') }" class="flex flex-col items-center text-gray-300" to="/app/settings">
          <solid-cog-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Ustawienia</span>
        </NuxtLink>    
      </div>      
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
