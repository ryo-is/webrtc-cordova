<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, defineComponent } from 'vue'
import { counterStore } from '@/store/counter'
import { CounterKey } from '../inject-keys'

export default defineComponent({
  setup() {
    provide(CounterKey, counterStore())
    return {}
  },
})
</script>
