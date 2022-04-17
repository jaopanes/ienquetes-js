import { createStore } from "vuex"

const debug = process.env.NODE_ENV !== 'production'

import auth from "../modules/auth/store"

export default createStore({
  modules: {
    auth,
  },
  strict: debug,
})