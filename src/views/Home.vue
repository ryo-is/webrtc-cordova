<template>
  <div class="home">
    <div class="count">count: {{ state.count }}</div>
    <div class="double">double: {{ state.double }}</div>
    <button @click="countUp">CountUp</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'

type State = {
  count: number
  double: number
}

export default defineComponent({
  name: 'home',
  setup() {
    const state: State = reactive({
      count: 0,
      double: computed<number>(() => state.count * 2),
    })

    const countUp = () => {
      state.count++
    }

    const clear = () => {
      state.count = 0
    }

    return {
      state,
      countUp,
      clear,
    }
  },
})
</script>
