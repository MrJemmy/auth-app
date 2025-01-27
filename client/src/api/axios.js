import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: process.env.SERVER_DOMAIN || 'http://localhost:8000/',
    baseURL: 'http://localhost:8000/',
    timeout: 10000, // Optional: set timeout
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for cross-domain requests
  });

  export default axiosInstance;