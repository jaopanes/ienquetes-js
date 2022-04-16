import BaseInput from "./BaseInput/index.vue"
import BaseTitle from "./BaseTitle/index.vue"

export default {
  install(app) {
    app.component('BaseInput', BaseInput)
    app.component('BaseTitle', BaseTitle)
  }
}