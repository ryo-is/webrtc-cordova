<template>
  <div
    class="flex items-center justify-between flex-wrap h-16 pl-10 z-100 space-x-3"
  >
    <div class="text-xl font-bold">WebRTC Demo</div>
    <div class="links divide-x divide-gray-400 flex-grow text-left">
      <a
        class="px-4"
        v-for="link in state.links"
        :key="link.label"
        :href="link.to"
        >{{ link.label }}</a
      >
    </div>
    <div class="slots flex items-center w-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

type Link = {
  to: string;
  label: string;
};

type State = {
  links: Link[];
};

export default defineComponent({
  name: 'appHeader',
  setup() {
    const state: State = reactive({
      links: [
        { to: '/', label: 'HOME' },
        { to: '/room', label: 'ROOM' },
      ],
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped></style>
