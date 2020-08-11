import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.scss';
import globalStore, { GlobalStoreKey } from './store/index';

const app = createApp(App);
app.provide(GlobalStoreKey, globalStore());
app.use(store).use(router).mount('#app');
