<template>
  <div class="mb-1 text-xl count">count: {{ count }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useGlobalStore } from '@/store/index'
export default defineComponent({
  setup() {
    const { counter } = useGlobalStore()
    const count = computed(() => counter.count)
    return {
      count,
    }
  },
})
</script>
