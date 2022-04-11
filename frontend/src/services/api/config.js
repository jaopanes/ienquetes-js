import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return error.response
});

export default instance
