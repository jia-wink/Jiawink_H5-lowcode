import axios from 'axios';
const request = axios.create({
  baseURL: 'https://lowcodeServer.jiawink.xyz:12580',
  timeout: 1000,
});

// request.interceptors.request.use()

export default request;
