export default axios => ({
  authenticate(email, password) {
    return axios.post('/user/authenticate', { email, password })
  },
});