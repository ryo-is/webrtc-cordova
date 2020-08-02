<template>
  <div class="mb-1 text-xl count">count: {{ count }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CounterKey } from '../inject-keys'
import injectOrError from '../inject-or-error'

export default defineComponent({
  setup() {
    const counter = injectOrError(CounterKey)
    const count = computed(() => counter.count)
    return {
      count,
    }
  },
})
</script>
