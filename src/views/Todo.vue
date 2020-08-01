<template>
  <div class="todo"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

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
