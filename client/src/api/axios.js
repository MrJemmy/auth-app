import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.SERVER_DOMAIN || 'http://localhost:8000/',
    timeout: 10000, // Optional: set timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default axiosInstance;