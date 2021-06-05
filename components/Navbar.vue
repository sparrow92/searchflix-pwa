<template>
  <div class="fixed flex md:justify-between items-center bottom-0 md:top-0 w-full h-16 md:px-8 bg-black dark:bg-gray-700 shadow-lg border-t border-gray-900 dark:border-gray-600 z-40">
    
    <NuxtLink class="hidden md:flex mr-auto" to="/app">
      <Logo class="h-10" />
    </NuxtLink>    

    <div class="flex justify-around items-center h-full w-full md:w-auto">
      <div class="md:h-full">
        <NuxtLink to="/app" class="menu-item">
          <solid-fire-icon class="w-7 h-7 md:hidden"  />
          <span class="text-xs md:text-lg font-bold md:font-medium">Główna</span>
        </NuxtLink>    
      </div>

      <div class="md:h-full">
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/search') }" class="menu-item" to="/app/search">
          <solid-search-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Szukaj</span>
        </NuxtLink>    
      </div>

      <div class="md:h-full">
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/playlist') }" class="menu-item" to="/app/playlist">
          <outline-clock-icon class="w-7 h-7 md:hidden" />
          <span class="text-xs md:text-lg font-bold md:font-medium">Playlista</span>
        </NuxtLink>    
      </div>

      <div class="md:h-full">
        <NuxtLink :class="{'nuxt-link-exact-active': isRouteActive('/app/settings') }" class="menu-item" to="/app/settings">
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
  .menu-item {
    @apply flex flex-col items-center text-gray-300 md:h-full md:justify-center md:hover:bg-gray-900 bg-opacity-20 md:px-5;
  }

  .menu-item.nuxt-link-exact-active {
    @apply md:bg-gradient-to-b from-gray-800 to-gray-900 ;
  }

  a.nuxt-link-exact-active {
    @apply text-red !important;

    & span {
      @apply text-gray-300;
    }
  }
</style>
