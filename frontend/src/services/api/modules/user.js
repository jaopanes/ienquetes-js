export default axios => ({
  authenticate(email, password) {
    return axios.post('/user/authenticate', { email, password })
  },
  register(payload) {
    return axios.post('/user', payload)
  }
});