<template>
  <div class="fixed inset-x-0 top-0 flex items-center h-12 px-10 z-100">
    <div class="mr-4 text-xl font-bold">WebRTC Demo</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

type Link = {
  to: string
  label: string
}

type State = {
  links: Link[]
}

export default defineComponent({
  name: 'appHeader',
  setup() {
    const state: State = reactive({
      links: [
        { to: '/', label: 'HOME' },
        { to: '/todo', label: 'TODO' },
      ],
    })

    return {
      state,
    }
  },
})
</script>

<style lang="scss" scoped></style>
