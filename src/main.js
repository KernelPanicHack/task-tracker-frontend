import { createApp } from 'vue';
import './app/style.css';
import App from './app/App.vue';
import router from './app/router.js';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';

const app = createApp(App);

// Настройка PrimeVue с темой Aura
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'white',
            cssLayer: false,
        }
    }
});

// Настройка Pinia
const pinia = createPinia();
app.use(pinia);

app.use(router).mount('#app');
