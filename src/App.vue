<template>
  <div
    id="app"
    class="flex flex-col items-center justify-center h-screen text-font-color"
  >
    <!-- <div class="text-4xl">Vue3 Demo</div> -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header.vue'

export default defineComponent({
  name: 'App',
  components: { Header },
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
