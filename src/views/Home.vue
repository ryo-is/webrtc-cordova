<template>
  <div class="home">
    <div class="count text-xl mb-1">count: {{ state.count }}</div>
    <div class="double text-xl mb-4">double: {{ state.double }}</div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none"
      @click="countUp"
    >
      CountUp
    </button>
    <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none"
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
