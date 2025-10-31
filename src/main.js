import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router.js';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

//Восстанавливаем токен 
if (authStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
  authStore.getUser();
}

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});

app.mount('#app');
