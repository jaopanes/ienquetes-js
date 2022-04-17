import { createApp } from 'vue'

import router from './router'
import common from './common'
import store from './store'

import 'vue-toast-notification/dist/theme-default.css';
import './assets/scss/_reset.scss'
import './assets/scss/_global.scss'

import App from './App.vue'

createApp(App)
  .use(common)
  .use(store)
  .use(router)
  .mount('#app')
