<template>
  <div class="home">
    <div class="mb-1 text-xl count">count: {{ state.count }}</div>
    <div class="mb-4 text-xl double">double: {{ state.double }}</div>
    <button
      class="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
      @click="countUp"
    >
      CountUp
    </button>
    <button
      class="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
      @click="clear"
    >
      Clear
    </button>
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
