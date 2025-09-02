import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.SERVER_DOMAIN || 'http://localhost:8000/',
  baseURL: 'http://localhost:8000/',
  timeout: 10000, // Optional: set timeout
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  headers: {
    'Content-Type':
      "multipart/form-data",
  },
  withCredentials: true, // Enable cookies for cross-domain requests
});

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    // status code is 403 insted of 401 !originalRequest._retry replaced with !originalRequest.?sent
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // replaced by originalRequest.sent = true
      try {

        // const newAccessToken = await refresh();  // refresh is Custom Hook
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        // return axiosInstance(originalRequest);

        await axiosInstance.get('/auth/refresh');
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
