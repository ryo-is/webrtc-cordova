<template>
  <div class="todo">
    <counter-display />
    <increment-button />
    <decrement-button />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CounterDisplay from '@/components/counter/CounterDisplay.vue'
import IncrementButton from '@/components/counter/IncrementButton.vue'
import DecrementButton from '@/components/counter/DecrementButton.vue'

type Task = {
  name: string
  status: 'done' | 'doing' | 'todo'
  content: string
}

type State = {
  tasks: Task[]
}

export default defineComponent({
  name: 'todo',
  components: {
    CounterDisplay,
    IncrementButton,
    DecrementButton,
  },
  setup() {
    const state: State = reactive({
      tasks: [{ name: 'todo_1', status: 'todo', content: 'hogehoge' }],
    })

    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped></style>
