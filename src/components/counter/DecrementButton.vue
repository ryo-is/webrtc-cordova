<template>
  <button
    class="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
    @click="decrement"
  >
    Decrement
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGlobalStore } from '@/store/index';
export default defineComponent({
  setup() {
    const { counter } = useGlobalStore();
    return {
      decrement: counter.decrement,
    };
  },
});
</script>
