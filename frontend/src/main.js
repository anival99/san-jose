// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Configuración de Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Iconos Material Design
import 'vuetify/styles'; // Estilos de Vuetify
import './assets/styles.css'; // Vincula tu archivo de estilos personalizado

createApp(App).use(router).use(vuetify).mount('#app');
