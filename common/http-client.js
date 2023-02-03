const axios = require('axios');

const httpClient = axios.create({
  // baseURL: 'http://localhost:8080/',
  timeout: 10000,
});

// 添加请求拦截器
httpClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 添加响应拦截器
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

module.exports = httpClient;
