import api from '../../services/api'
import VueToast from 'vue-toast-notification';

export default {
  install(app) {
    app.config.globalProperties.$api = api;
    app.provide("api", { api });

    app.use(VueToast)
  }
}