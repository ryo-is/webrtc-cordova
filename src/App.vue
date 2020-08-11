<template>
  <div
    id="app"
    class="flex flex-col items-center justify-center h-screen text-font-color"
  >
    <!-- <div class="text-4xl">Vue3 Demo</div> -->
    <!-- <app-header></app-header> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss">
body {
  @apply bg-gray-800;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
