<template>
  <button
    class="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
    @click="increment"
  >
    Increment
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalStore } from '@/store/index'
export default defineComponent({
  setup() {
    const { counter } = useGlobalStore()
    return {
      increment: counter.increment,
    }
  },
})
</script>
