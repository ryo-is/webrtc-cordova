<template>
  <div class="room">
    <app-header>
      <div class="mr-4">
        <input
          v-model="state.roomID"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          id="room-id"
          type="text"
          placeholder="Room Name"
        />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4 py-2 px-4 rounded focus:outline-none"
        type="button"
        @click="onJoin"
      >
        Join
      </button>
      <button
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold mr-4 py-2 px-4 rounded focus:outline-none"
        type="button"
        @click="onLeave"
      >
        Leave
      </button>
    </app-header>
    <div class="local-stream-wrapper relative">
      <video
        id="js-local-stream"
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
        <video-button
          class="video-button"
          :video="state.video"
          @change-video="onChangeVideo"
        ></video-button>
      </div>
    </div>

    <div class="remote-streams flex" id="js-remote-streams"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import Peer, { SfuRoom } from 'skyway-js';
import AppHeader from '@/components/elements/AppHeader.vue';
import VideoButton from '@/components/elements/VideoControlButton.vue';
import AudioButton from '@/components/elements/AudioControlButton.vue';

type State = {
  roomID: string;
  audio: boolean;
  video: boolean;
};

interface VideoElement {
  playsInline: boolean;
}

const peer = new Peer({
  key: process.env.VUE_APP_SKYWAY_APIKEY
    ? process.env.VUE_APP_SKYWAY_APIKEY
    : '',
  debug: 3,
});

let localStream: MediaStream;
let room: SfuRoom;
let localVideo: HTMLVideoElement;
let remoteVideos: HTMLElement;

export default defineComponent({
  name: 'home',
  components: { AppHeader, VideoButton, AudioButton },
  setup() {
    const state: State = reactive({
      roomID: '',
      audio: true,
      video: true,
    });

    const onJoin = () => {
      if (!peer.open) {
        return;
      }
      room = peer.joinRoom(state.roomID, {
        mode: 'sfu',
        stream: localStream,
      });

      room.on('stream', async (stream) => {
        console.log('stream', stream);
        const newVideo = document.createElement('video') as HTMLVideoElement &
          VideoElement;
        newVideo.srcObject = stream;
        newVideo.playsInline = true;
        newVideo.className = 'flex-1';
        newVideo.setAttribute('data-peer-id', stream.peerId);
        remoteVideos.append(newVideo);
        await newVideo.play().catch(console.error);
      });

      room.on('peerLeave', (peerId) => {
        const remoteVideo = remoteVideos.querySelector(
          `[data-peer-id="${peerId}"]`
        ) as HTMLVideoElement;
        if (remoteVideo && remoteVideo.srcObject) {
          const srcObj = remoteVideo.srcObject as MediaStream;
          srcObj.getTracks().forEach((track: MediaStreamTrack) => track.stop());
          remoteVideo.srcObject = null;
          remoteVideo.remove();
        }
      });

      room.once('close', () => {
        console.log(remoteVideos.children);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.from(remoteVideos.children).forEach((remoteVideo: any) => {
          if (remoteVideo.srcObject) {
            const srcObj = remoteVideo.srcObject as MediaStream;
            srcObj
              .getTracks()
              .forEach((track: MediaStreamTrack) => track.stop());
            remoteVideo.srcObject = null;
            remoteVideo.remove();
          }
        });
      });
    };

    const onLeave = () => {
      if (room) room.close();
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

    const onChangeVideo = async () => {
      state.video = !state.video;
      await getMedia();
    };

    const onChangeAudio = async () => {
      state.audio = !state.audio;
      localStream
        .getAudioTracks()
        .forEach((track: MediaStreamTrack) => (track.enabled = state.audio));
    };

    onMounted(async () => {
      try {
        localVideo = document.getElementById(
          'js-local-stream'
        ) as HTMLVideoElement;
        remoteVideos = document.getElementById(
          'js-remote-streams'
        ) as HTMLElement;
        await getMedia();
      } catch (err) {
        console.error(err);
      }
    });

    return { state, onJoin, onLeave, onChangeVideo, onChangeAudio };
  },
});
</script>

<style lang="scss" scoped>
.local-stream-wrapper,
.remote-streams {
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
