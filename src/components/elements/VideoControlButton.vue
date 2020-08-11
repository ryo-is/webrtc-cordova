<template>
  <button
    class="text-white font-bold mt-2 py-2 px-4 rounded-full focus:outline-none"
    :class="{
      'bg-blue-500 hover:bg-blue-700': video,
      'bg-red-500 hover:bg-red-700': !video,
    }"
    type="button"
    @click="onChangeVideo"
  >
    <svg v-if="video" style="width: 24px; height: 24px;" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"
      />
    </svg>
    <svg v-if="!video" style="width: 24px; height: 24px;" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3.27,2L2,3.27L4.73,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16C16.2,18 16.39,17.92 16.54,17.82L19.73,21L21,19.73M21,6.5L17,10.5V7A1,1 0 0,0 16,6H9.82L21,17.18V6.5Z"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'

export default defineComponent({
  props: {
    video: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context: SetupContext) {
    const onChangeVideo = () => {
      context.emit('change-video')
    }

    return {
      onChangeVideo,
    }
  },
})
</script>
