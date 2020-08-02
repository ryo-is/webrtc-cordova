<template>
  <div class="home">
    <counter-display />
    <increment-button />
    <decrement-button />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CounterDisplay from '@/components/counter/CounterDisplay.vue'
import IncrementButton from '@/components/counter/IncrementButton.vue'
import DecrementButton from '@/components/counter/DecrementButton.vue'

export default defineComponent({
  name: 'home',
  components: {
    CounterDisplay,
    IncrementButton,
    DecrementButton,
  },
})
</script>
