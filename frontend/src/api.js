import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
      'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default api;