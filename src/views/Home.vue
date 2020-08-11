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

    <div class="video-wrapper relative">
      <video
        id="skyway-video"
        class="mx-auto"
        autoplay
        playsinline
        muted
      ></video>
      <div
        class="button-wrapper absolute flex flex-wrap items-center justify-center space-x-2 mx-auto inset-x-0"
      >
        <audio-button
          class="audio-button"
          :audio="state.audio"
          @change-audio="onChangeAudio"
        ></audio-button>
      </div>
    </div>

    <div class="video-wrapper relative">
      <video id="their-video" class="mx-auto" autoplay playsinline></video>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import Peer, { MediaConnection } from 'skyway-js';
import AppHeader from '@/components/elements/AppHeader.vue';
import AudioButton from '@/components/elements/AudioControlButton.vue';

type State = {
  peerID: string;
  theirID: string;
  audio: boolean;
  video: boolean;
};

const peer = new Peer({
  key: process.env.VUE_APP_SKYWAY_APIKEY
    ? process.env.VUE_APP_SKYWAY_APIKEY
    : '',
  debug: 3,
});

let localStream: MediaStream;
let localVideo: HTMLVideoElement;
let localMediaConnection: MediaConnection;

export default defineComponent({
  name: 'home',
  components: { AppHeader, AudioButton },
  setup() {
    const state: State = reactive({
      peerID: '',
      theirID: '',
      audio: true,
      video: true,
    });

    const setEventListener = (mediaConnection: MediaConnection) => {
      mediaConnection.on('stream', (stream) => {
        const videoElm = document.getElementById(
          'their-video'
        ) as HTMLVideoElement;
        videoElm.srcObject = stream;
        videoElm.play();
      });
    };

    const onCall = () => {
      localMediaConnection = peer.call(state.theirID, localStream);
      setEventListener(localMediaConnection);
    };

    const onCancel = () => {
      if (localMediaConnection) localMediaConnection.close(true);
    };

    const getMedia = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          audio: state.audio,
          video: state.video,
        });
        localVideo.muted = true;
        localVideo.srcObject = localStream;
        await localVideo.play();
      } catch (err) {
        console.error(err);
      }
    };

    const onChangeAudio = async () => {
      state.audio = !state.audio;
      localStream
        .getAudioTracks()
        .forEach((track: MediaStreamTrack) => (track.enabled = state.audio));
    };

    onMounted(async () => {
      try {
        peer.once('open', () => {
          state.peerID = peer.id;
        });

        peer.on('call', (mediaConnection) => {
          mediaConnection.answer(localStream);
          setEventListener(mediaConnection);
        });

        localVideo = document.getElementById(
          'skyway-video'
        ) as HTMLVideoElement;
        await getMedia();
      } catch (error) {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      }
    });

    return { state, onCall, onCancel, onChangeAudio };
  },
});
</script>

<style lang="scss" scoped>
.video-wrapper {
  height: calc((100vh - 64px) / 2);
  width: 100vw;

  video {
    height: 100%;
  }
}
.button-wrapper {
  bottom: 8px;
}
</style>
