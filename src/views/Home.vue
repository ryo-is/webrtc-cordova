<template>
  <div class="home">
    <counter-provider>
      <counter-display />
      <increment-button />
      <decrement-button />
    </counter-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CounterProvider from '@/components/injects/counter/CounterProvider.vue'
import CounterDisplay from '@/components/injects/counter/CounterDisplay.vue'
import IncrementButton from '@/components/injects/counter/IncrementButton.vue'
import DecrementButton from '@/components/injects/counter/DecrementButton.vue'

export default defineComponent({
  name: 'home',
  components: {
    CounterProvider,
    CounterDisplay,
    IncrementButton,
    DecrementButton,
  },
})
</script>
