import axios from 'axios';
const request = axios.create({
  baseURL: 'http://localhost:12580',
  timeout: 1000,
});

// request.interceptors.request.use()

export default request;
