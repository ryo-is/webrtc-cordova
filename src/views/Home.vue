<template>
  <div class="home">
    <app-header>
      <p class="mr-4">PeerID: {{ state.peerID }}</p>
      <div class="mr-4">
        <input
          v-model="state.theirID"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          id="their-id"
          type="text"
          placeholder="theirID"
        />
      </div>
      <button
        class="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        type="button"
        @click="onCall"
      >
        Call
      </button>
      <button
        class="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        type="button"
        @click="onCancel"
      >
        Cansel
      </button>
    </app-header>
    <video id="skyway-video" width="400" autoplay playsinline muted></video>
    <video id="their-video" width="400" autoplay playsinline></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import Peer, { MediaConnection } from 'skyway-js'
import AppHeader from '@/components/elements/header.vue'

type State = {
  peerID: string
  theirID: string
}

const peer = new Peer({
  key: process.env.VUE_APP_SKYWAY_APIKEY
    ? process.env.VUE_APP_SKYWAY_APIKEY
    : '',
  debug: 3,
})

let localStream: MediaStream
let localMediaConnection: MediaConnection

export default defineComponent({
  name: 'home',
  components: { AppHeader },
  setup() {
    const state: State = reactive({
      peerID: '',
      theirID: '',
    })

    const setEventListener = (mediaConnection: MediaConnection) => {
      mediaConnection.on('stream', (stream) => {
        // video要素にカメラ映像をセットして再生
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videoElm = document.getElementById('their-video') as any
        videoElm.srcObject = stream
        videoElm.play()
      })
    }

    const onCall = () => {
      localMediaConnection = peer.call(state.theirID, localStream)
      setEventListener(localMediaConnection)
    }

    const onCancel = () => {
      if (localMediaConnection) localMediaConnection.close(true)
    }

    onMounted(() => {
      // カメラ映像取得
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // 成功時にvideo要素にカメラ映像をセットし、再生
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const videoElm = document.getElementById('skyway-video') as any
          videoElm.srcObject = stream
          videoElm.play()
          // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
          localStream = stream
        })
        .catch((error) => {
          // 失敗時にはエラーログを出力
          console.error('mediaDevice.getUserMedia() error:', error)
          return
        })

      peer.on('open', () => {
        state.peerID = peer.id
      })

      peer.on('call', (mediaConnection) => {
        mediaConnection.answer(localStream)
        setEventListener(mediaConnection)
      })
    })

    return { state, onCall, onCancel }
  },
})
</script>
