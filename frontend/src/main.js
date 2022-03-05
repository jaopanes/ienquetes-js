import { createApp } from 'vue'
import router from './router'

import './assets/scss/_reset.scss'

import App from './App.vue'

createApp(App).use(router).mount('#app')
