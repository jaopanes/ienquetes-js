import api from "../../../services/api"

export default {
  state: () => {
    return {
      userLogged: JSON.parse(localStorage.getItem('userLogged')),
    }
  },

  getters: {
    getUserLogged(state) {
      return state.userLogged
    }
  },

  actions: {
    async authenticate({ commit }, payload) {
      try {
        const response = await api.user.authenticate(payload.email, payload.password)

        if (response.status !== 200) {
          const erro = response.data.erros[0] || 'Ocorreu um erro interno.'
          return { ok: false, erro }
        }

        commit('setUserLogged', response.data)
        return { ok: true };
      } catch (error) {
        console.error(error)
        commit('setUserLogged', null)

        return { ok: false, erro: error }
      }
    },

    async register({ commit }, payload) {
      try {
        const response = await api.user.register(payload);

        if (response.status !== 201) {
          const erro = response.data.erros[0] || 'Ocorreu um erro interno.'
          return { ok: false, erro }
        }

        return { ok: true }
      } catch (error) {
        console.error(error)
        return { ok: false, erro: error }
      }
    }
  },

  mutations: {
    setUserLogged(state, value) {
      state.userLogged = value
      window.localStorage.setItem('userLogged', JSON.stringify(value))
    }
  },

  namespaced: true,
}