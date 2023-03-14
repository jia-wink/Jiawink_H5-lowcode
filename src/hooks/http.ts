import axios from 'axios';
const request = axios.create({
  // 生产线
  baseURL: 'https://lowcodeServer.jiawink.xyz',
  // 测试线
  // baseURL: 'http://localhost:12580',
  timeout: 1000,
});

// request.interceptors.request.use()

export default request;
